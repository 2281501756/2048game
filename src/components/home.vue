<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from '../router';
import changeTheme from '../utils/theme'
const {router, setRouter} = useRouter()
const toLink = (url: string) => {
  setRouter(url)
}

// 主题
const THEME_LIST = ['default', 'dark']
const theme = ref(
  localStorage.getItem('2048theme') ? (localStorage.getItem('2048theme') as string) : 'default'
)
const handerTheme = () => {
  let i = THEME_LIST.indexOf(theme.value)
  if (i == -1) {
    changeTheme('default')
    theme.value = 'default'
    localStorage.setItem('2048theme', theme.value)
    return
  } else {
    i = (i + 1) % THEME_LIST.length
    changeTheme(THEME_LIST[i])
    theme.value = THEME_LIST[i]
    localStorage.setItem('2048theme', theme.value)
  }
}
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="logo">2048 GAME</div>
      <div @click="toLink('comment')" class="button">经典模式</div>
      <div @click="toLink('nine')" class="button">9*9模式</div>
      <div @click="toLink('custom')" class="button">自定义模式</div>
      <div @click="handerTheme()" class="button">主题：{{ theme }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.root {
  width: 100%;
  background-color: var(--main-background-color);
}

.container {
  margin: 0 auto;
  width: 600px;
  height: 670px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: var(--home-background) no-repeat center/cover;

  .logo {
    font-size: 50px;
    font-weight: 600;
    font-family: sans-serif;
    color: var(--home-logo-color);
  }
  .button {
    width: 160px;
    height: 60px;
    background: var(--home-button-background);
    text-align: center;
    line-height: 60px;
    color: var(--home-button-color);
    font-size: 20px;
    font-weight: bolder;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .button:hover {
    background: var(--home-button-hover-background);
    color: var(--home-button-hover-color);
  }
}
</style>
