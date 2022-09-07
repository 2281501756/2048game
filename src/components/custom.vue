<script lang="ts" setup>
import { ref, reactive, watch, nextTick, onMounted } from 'vue'
import { useRouter } from '../router'
import Game from '../game/logic'

const { router, setRouter } = useRouter()
const getForm = ref<boolean>(true)
const root = ref<HTMLDivElement>()
const form = ref<HTMLDivElement>()
const score = ref(0)
const parameters = reactive({
  height: 600,
  width: 600,
  row: 4,
  col: 4,
  interval: 15,
  option: {
    prob4: 0,
    prob8: 0,
    prob16: 0,
  },
})
let game: Game | null = null

const handersure = async () => {
  getForm.value = false
  await nextTick()
  if (root.value)
    game = new Game(
      parameters.width,
      parameters.height,
      parameters.row,
      parameters.col,
      parameters.interval,
      root.value,
      score,
      {
        prob16: parameters.option.prob16 / 100,
        prob8: parameters.option.prob8 / 100,
        prob4: parameters.option.prob4 / 100,
      }
    )
}

const handerCancel = () => {
  setRouter('home')
}
const handerFrom = () => {
  if (game) game.anewGame()
  getForm.value = true
}

const handleNewGame = () => {
  if (game) game.anewGame()
}

watch(
  () => [
    parameters.width,
    parameters.height,
    parameters.row,
    parameters.col,
    parameters.interval,
    parameters.option.prob16,
    parameters.option.prob8,
    parameters.option.prob4,
  ],
  ([width, height, row, col, interval, value16, value8, value4]) => {
    if (width < 100) parameters.width = 100
    if (height < 100) parameters.height = 100
    if (row < 4) parameters.row = 4
    if (col < 4) parameters.col = 4
    if (interval < 0) parameters.interval = 0
    if (value16 < 0) parameters.option.prob16 = 0
    if (value8 < 0) parameters.option.prob8 = 0
    if (value4 < 0) parameters.option.prob4 = 0
    if (value16 > 100) parameters.option.prob16 = 100
    if (value8 > 100) parameters.option.prob8 = 100
    if (value4 > 100) parameters.option.prob4 = 100
  }
)
onMounted(() => {
  let theme = localStorage.getItem('2048theme')
  if (theme === 'dark' && form.value) {
    form.value.style.color = '#fff'
    document.querySelectorAll('input').forEach((i) => {
      i.style.color = '#fff'
    })
    document.querySelectorAll<HTMLDivElement>('.headline').forEach((i) => (i.style.color = '#fff'))
    document.querySelectorAll<HTMLDivElement>('.hint').forEach((i) => (i.style.color = '#fff'))
  }
})
</script>

<template>
  <div class="body">
    <template v-if="!getForm">
      <div class="head">
        <div @click="handerCancel()">菜单</div>
        <div @click="handerFrom()">配置</div>
        <div @click="handleNewGame()">新游戏</div>
        <div>得分:{{ score }}</div>
      </div>
      <div class="root" ref="root"></div>
    </template>
    <template v-else>
      <div ref="form" class="form">
        <div class="headline">自定义配置</div>
        <div class="form-item">
          <div class="title">窗口宽度</div>
          <input type="number" min="100" v-model="parameters.width" />
        </div>
        <div class="form-item">
          <div class="title">窗口高度</div>
          <input type="number" min="100" v-model="parameters.height" />
        </div>
        <div class="form-item">
          <div class="title">行数</div>
          <input type="number" min="1" v-model="parameters.row" />
        </div>
        <div class="form-item">
          <div class="title">列数</div>
          <input type="number" min="1" v-model="parameters.col" />
        </div>
        <div class="form-item">
          <div class="title">间距距离</div>
          <input type="number" min="0" max="20" v-model="parameters.interval" />
        </div>
        <div class="form-item">
          <div class="title">16的概率</div>
          <input type="number" min="0" max="100" v-model="parameters.option.prob16" />
        </div>
        <div class="form-item">
          <div class="title">8的概率</div>
          <input type="number" min="0" max="100" v-model="parameters.option.prob8" />
        </div>
        <div class="form-item">
          <div class="title">4的概率</div>
          <input type="number" min="0" max="100" v-model="parameters.option.prob4" />
        </div>
        <div class="hint">
          *
          可以使用方向键控制数字的增加，概率最大值是100，如果概率之和超过100会去数低的概率,不要设置太多不然会卡住
        </div>
        <div class="form-footer">
          <button @click="handersure()">确定</button>
          <button @click="handerCancel()">返回</button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.body {
  background-color: var(--main-background-color);
}
.root {
  margin: 0px auto;
  background-color: var(--map-color);
}
.head {
  display: flex;
  justify-content: center;
  & > div {
    cursor: pointer;
    margin: 10px;
    padding: 10px;
    color: white;
    background-color: var(--base-color);
    border-radius: 3px;
  }
}
.form {
  position: relative;
  width: 600px;
  height: 670px;
  margin: 0 auto;
  display: flex;
  padding: 200px 0px;
  flex-wrap: wrap;
  background: var(--home-background) no-repeat center/cover;

  .headline {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    text-align: center;
    color: var(--base-color);
    font-size: 30px;
    font-weight: 700;
  }
}
.form-item {
  margin: 20px 20px;
  position: relative;
  & > div {
    display: inline-block;
  }

  input {
    height: 40px;
    width: 140px;
    border: 2px solid var(--base-color);
    padding-left: 5px;
    background-color: var(--map-color);
    color: var(--base-color);
    font-size: 20px;
    outline: none;
  }
  .title {
    width: 90px;
    text-align: right;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .title::after {
    content: ':';
  }
}
.hint {
  margin-top: 10px;
  color: #444;
  padding: 0 40px;
  font-size: 13px;
}
.form-footer {
  width: 100%;
  text-align: center;
  button {
    margin: 20px;
    display: inline-block;
    width: 75px;
    height: 40px;
    border-radius: 3px;
    color: #f1f1f1;
    font-size: 20px;
    font-weight: 500;
    border: 0;
    outline: none;
    background-color: var(--base-color);
  }
  button:active {
    transform: scale(0.89);
  }
  button:focus {
    border: 3px solid #fff;
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
