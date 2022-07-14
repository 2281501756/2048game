<template>
  <div class="game-container">
    <div class="game-header">
      <div class="game-header-title">2048 game</div>
      <div class="game-header-card">
        <div>
          <div>得分</div>
          <div>0</div>
        </div>
        <div>
          <div>历史</div>
          <div>0</div>
        </div>
      </div>
    </div>
    <div class="game-button">
      <div>WASD操作</div>
      <div @click="handleGame">新游戏</div>
    </div>
    <div class="game-content">
      <game-vue ref="game"></game-vue>
    </div>
    <div class="game-footer"></div>
  </div>
</template>

<script lang="ts" setup>
import gameVue from './components/game.vue'
import { onMounted, ref } from 'vue'
const game = ref()
const handleGame = () => {
  console.log(game.value.anewGame())
}
</script>

<style scoped lang="less">
.game-container {
  width: 600px;
  height: 100%;
  margin: 0 auto;
  background-color: #faf8ef;
  padding: 50px;
  padding-top: 25px;
}
.game-header {
  color: var(--base-color);
  display: flex;
  justify-content: space-between;
  &-title {
    font-size: 35px;
    font-weight: 700;
  }
  &-card {
    display: flex;
    & > div {
      background-color: var(--base-color);
      width: 60px;
      height: 45px;
      margin: 5px;
      color: white;
      border-radius: 3px;
      & > div {
        text-align: center;
        line-height: 22.5px;
      }
      & > div:first-child {
        font-size: 10px;
      }
    }
  }
}
.game-button {
  display: flex;
  justify-content: space-between;
  height: 40px;
  & > div {
    height: 100%;
  }
  & > div:first-child {
    color: var(--base-color);
    font-size: 20px;
    letter-spacing: 0.1em;
  }
  & > div:last-child {
    background-color: var(--base-color);
    color: #fff;
    line-height: 40px;
    width: 80px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    &:active {
      transform: scale(0.89);
    }
  }
}
.game-content {
  width: 100%;
  height: 500px;
  padding: 15px;
}
</style>
