<script lang="ts" setup>
import { ref, onMounted, } from 'vue'
import { useRouter } from '../router';
import Game from '../game/logic.js'

let root = ref<HTMLDivElement>()
let game: any
let score = ref(0)
const { router, setRouter} = useRouter()
const handleHome = () => {
  setRouter('home')
}
const handleNewGame = () => {
  game.anewGame()
}
onMounted(() => {
  if (root.value) game = new Game(660, 660, 9, 9, 10, root.value, score)
})
</script>

<template>
  <div class="body">
    <div class="head">
      <div @click="handleHome()">菜单</div>
      <div @click="handleNewGame()">新游戏</div>
      <div>得分:{{ score }}</div>
    </div>
    <div class="root" ref="root"></div>
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
    margin: 10px;
    padding: 10px;
    color: white;
    border-radius: 3px;
    background-color: var(--base-color);
  }
}
</style>
