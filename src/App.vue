<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from './router'
import changeTheme from './utils/theme'
import Home from './components/home.vue'
import Nine from './components/nine.vue'
import CommentMode from './components/commentMode.vue'
import Custom from './components/custom.vue'

let root = ref<HTMLDivElement>()
const { router, setRouter } = useRouter()
function onmousewheel(e: any) {
  let dom = root.value?.parentElement
  if (e.wheelDelta > 0 && dom) {
    dom.scrollTop -= 40
  } else if (e.wheelDelta < 0 && dom) {
    dom.scrollTop += 40
  }
}

onMounted(() => {
  let theme = localStorage.getItem('2048theme')
  if (!theme) localStorage.setItem('2048theme', 'default')
  else {
    changeTheme(theme)
  }

  let dom = root.value?.parentElement
  if (dom) {
    let color = document.documentElement.style.getPropertyValue('--main-background-color')
    dom.style.backgroundColor = color
    dom.style.overflowY = 'scroll'
    dom.addEventListener('mousewheel', onmousewheel, false)
  }
})
</script>

<template>
  <div class="root" ref="root">
    <Home v-if="router === 'home'"></Home>
    <comment-mode v-if="router === 'comment'"></comment-mode>
    <nine v-if="router === 'nine'"></nine>
    <custom v-if="router === 'custom'"></custom>
  </div>
</template>

<style scoped>
.root {
  height: 100%;
}
</style>
