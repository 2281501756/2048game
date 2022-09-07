<template>
  <div class="game-footer">
    <div class="game-footer-head1-box">
      <div
        :class="['game-footer-head1', listType === list.top ? 'click' : '']"
        @click="handleFooterHead(list.top)"
      >
        排行榜
      </div>
      <div
        :class="['game-footer-head1', listType === list.time ? 'click' : '']"
        @click="handleFooterHead(list.time)"
      >
        实时榜
      </div>
    </div>
    <div v-if="listType === list.top" class="game-footer-head2">
      分数前一百名<span @click="handleFlesh">刷新</span>
    </div>
    <div v-if="listType === list.time" class="game-footer-head2">
      最近游玩<span @click="handleFlesh">刷新</span>
    </div>
    <top-list-vue :type="listType" ref="topList"></top-list-vue>
  </div>
</template>

<script lang="ts" setup>
import topListVue from './topList.vue'
import { list } from './topList.type'
import { ref } from 'vue'
const topList = ref()
const listType = ref(list.top)
const handleFooterHead = (type: list) => {
  listType.value = type
  setTimeout(() => {
    handleFlesh()
  }, 10)
}
const handleFlesh = () => {
  topList.value.getList()
}
</script>

<style lang="less" scoped>
.click {
  background-color: var(--base-color);
  color: white;
}
.game-footer {
  color: var(--base-color);
  &-head1-box {
    display: flex;
    justify-content: center;
  }
  &-head1 {
    font-size: 30px;
    text-align: center;
    font-weight: 800;
    letter-spacing: 0.2em;
    margin: 10px;
    display: inline-block;
    padding: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
  }
  &-head2 {
    text-align: center;
    & span {
      display: inline-block;
      margin-left: 3px;
      font-weight: 600;
      text-decoration: underline;
      cursor: pointer;
      user-select: none;
    }
    & span:active {
      transform: scale(0.89);
    }
  }
}
</style>
