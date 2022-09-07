<template>
  <div ref="main" class="main" tabindex="1">
    <div class="game-container">
      <div class="game-header">
        <div class="game-header-title">
          <span @click="handleHome()" class="home">菜单</span> 2048
        </div>
        <div class="game-header-music" @click="updateMusicState">
          <div v-if="musicState" class="game-header-music-on">
            <svg
              t="1657963604813"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2316"
              width="200"
              height="200"
            >
              <path
                d="M895.456 770.56C895.552 769.696 896 768.896 896 768L896 160c0-1.056-0.512-1.984-0.608-3.008-0.032-1.664 0.448-3.232 0.16-4.928-2.88-17.408-19.328-29.184-36.8-26.304l-480 80c-17.408 2.912-29.216 19.392-26.304 36.832 0.256 1.472 1.024 2.656 1.44 4.032C352.96 249.664 352 252.672 352 256l0 429.6c-20.128-9.376-43.648-14.784-69.408-14.784-21.312 0-42.816 3.456-63.968 10.336-39.616 12.8-73.536 36.224-95.584 65.984-24.064 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.72-3.456 63.904-10.304 58.656-19.04 100.288-59.2 115.04-103.808C413.888 811.328 416 806.016 416 800l0-5.312c1.056-8.48 1.056-16.96 0-25.472L416 264.448l416-69.344 0 490.88c-20.32-9.632-44.096-15.2-70.176-15.2-21.28 0-42.816 3.456-63.968 10.336-39.584 12.8-73.568 36.224-95.584 65.984-24.096 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.752-3.456 63.904-10.304C853.472 894.56 902.176 831.68 895.456 770.56z"
                p-id="2317"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div v-else class="game-header-music-off">
            <svg
              t="1657963647149"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2615"
              width="200"
              height="200"
            >
              <path
                d="M616.576 730.976c-5.056 5.216-10.08 10.432-14.304 16.16-24.096 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.752-3.456 63.904-10.304 9.632-3.136 18.784-6.816 27.424-11.008L616.576 730.976z"
                p-id="2616"
                fill="#ffffff"
              ></path>
              <path
                d="M416 273.408l0-8.96 416-69.312 0 476.192 64 61.216L896 160c0-1.056-0.512-1.984-0.608-3.008-0.032-1.664 0.448-3.232 0.16-4.896-2.88-17.44-19.424-29.408-36.8-26.304l-480 80C370.24 207.2 363.2 211.936 358.4 218.336L416 273.408z"
                p-id="2617"
                fill="#ffffff"
              ></path>
              <path
                d="M352 477.92l0 207.68c-20.128-9.376-43.648-14.784-69.408-14.784-21.28 0-42.816 3.456-63.968 10.336-39.584 12.8-73.568 36.224-95.584 65.984-24.096 32.512-31.68 70.24-20.864 103.648 15.648 48.288 66.656 79.456 129.92 79.456 21.248 0 42.752-3.456 63.904-10.304 58.656-19.04 100.32-59.2 115.04-103.808C413.92 811.328 416 806.016 416 800l0-5.216c1.056-8.512 1.056-17.024 0-25.6l0-230.048L352 477.92z"
                p-id="2618"
                fill="#ffffff"
              ></path>
              <path
                d="M928 928c-7.968 0-15.904-2.944-22.112-8.864l-736-704C157.12 202.912 156.672 182.656 168.864 169.888c12.192-12.736 32.48-13.216 45.248-0.992l736 704c12.736 12.224 13.216 32.48 0.992 45.248C944.832 924.672 936.448 928 928 928z"
                p-id="2619"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </div>
        <div class="game-header-card">
          <div>
            <div>得分</div>
            <div>{{ game?.grade || 0 }}</div>
          </div>
          <div>
            <div>历史</div>
            <div>{{ maxGrade || 0 }}</div>
          </div>
        </div>
      </div>
      <div class="game-button">
        <div>WASD或方向键操作</div>
        <div @click="handleGame">新游戏</div>
      </div>
      <div class="game-content">
        <game-vue
          @ongameover="updateGrade"
          ref="game"
          :music-state="musicState"
          :game_add_event="game_add_event"
          :game_remove_event="game_remove_event"
        ></game-vue>
      </div>
      <game-footer-vue></game-footer-vue>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gameVue from './game.vue'
import gameFooterVue from './gameFooter.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from '../router'
const game = ref()
const maxGrade = ref()
const main = ref<HTMLDivElement>()
maxGrade.value = localStorage.getItem('2048Grage')
const musicState = ref<boolean>(true)
const { router, setRouter } = useRouter()
const handleHome = () => {
  setRouter('home')
}

const updateMusicState = () => {
  musicState.value = !musicState.value
  localStorage.setItem('2048MusicState', musicState.value + '')
}
const updateGrade = () => {
  maxGrade.value = localStorage.getItem('2048Grage')
}
const handleGame = () => {
  game.value.anewGame()
}

let GAME_EVENT_STATE = false

const game_add_event = () => {
  if (GAME_EVENT_STATE) return
  main.value && main.value.addEventListener('keydown', game.value.handleKey, false)
  GAME_EVENT_STATE = true
}
const game_remove_event = () => {
  if (!GAME_EVENT_STATE) return
  main.value && main.value.removeEventListener('keydown', game.value.handleKey, false)
  GAME_EVENT_STATE = false
}

// 滚动事件
// function onmousewheel(e: any) {
//   let dom = main.value?.parentElement
//   if (e.wheelDelta > 0 && dom) {
//     dom.scrollTop -= 40
//   } else if (e.wheelDelta < 0 && dom) {
//     dom.scrollTop += 40
//   }
// }

// 上传成绩
const upload_grade = (score: number) => {
  axios.post(import.meta.env.VITE_BASE_URL + '/login/set/up', {
    data: {
      user_name: window.user.username,
      photo: window.user.photo,
      score: score,
      openid: window.user.openid,
    },
  })
}

onMounted(() => {
  let m_s = localStorage.getItem('2048MusicState')
  if (m_s === 'false') musicState.value = false
  // let dom = main.value?.parentElement
  // if (dom) {
  //   dom.style.overflowY = 'scroll'
  //   dom.addEventListener('mousewheel', onmousewheel, false)
  // }
  // if (maxGrade.value) {
  //   setTimeout(() => {
  //     upload_grade(parseInt(maxGrade.value))
  //   }, 1000)
  // }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  background-color: var(--main-background-color);
  outline: none;
}
.game-container {
  width: 600px;
  height: 100%;
  margin: 0 auto;
  padding: 50px;
  padding-top: 25px;
  background-color: var(--main-background-color);
}
.game-header {
  user-select: none;
  color: var(--base-color);
  display: flex;
  justify-content: space-between;
  &-title {
    font-size: 35px;
    font-weight: 700;
  }
  &-music {
    font-size: 18px;
    font-weight: 500;
    border-radius: 50%;
    color: white;
    width: 50px;
    height: 50px;
    line-height: 50px;
    background-color: var(--base-color);

    & > div {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & svg {
      width: 40px;
      height: 40px;
    }
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
.home {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  color: #fff;
  background-color: var(--base-color);
  cursor: pointer;
}
</style>
