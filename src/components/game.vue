<template>
  <div class="game">
    <div class="map">
      <div class="row row-1">
        <div class="col col-1"></div>
        <div class="col col-2"></div>
        <div class="col col-3"></div>
        <div class="col col-4"></div>
      </div>
      <div class="row row-2">
        <div class="col col-1"></div>
        <div class="col col-2"></div>
        <div class="col col-3"></div>
        <div class="col col-4"></div>
      </div>
      <div class="row row-3">
        <div class="col col-1"></div>
        <div class="col col-2"></div>
        <div class="col col-3"></div>
        <div class="col col-4"></div>
      </div>
      <div class="row row-4">
        <div class="col col-1"></div>
        <div class="col col-2"></div>
        <div class="col col-3"></div>
        <div class="col col-4"></div>
      </div>
    </div>
    <div ref="cardContent" class="card-content"></div>
    <div ref="gameoverButton" class="gameover">
      <div class="gameover-box">
        <div>GAME OVER</div>
        <div>得分：{{ grade }}</div>
      </div>
      <div class="gameover-button" @click="anewGame(true)">从新开始</div>
    </div>
    <audio ref="mergeMP3" src="bo.mp3"></audio>
    <audio ref="noMP3" src="du.mp3"></audio>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { empty, direction } from './game.type'
import axios from 'axios'
const props = defineProps<{
  musicState: boolean
  game_add_event: () => void
  game_remove_event: () => void
}>()
const emit = defineEmits<{
  (event: 'ongameover'): void
}>()

const { game_add_event, game_remove_event } = props
const grade = ref(0)
const cardContent = ref<HTMLDivElement>()
const gameoverButton = ref<HTMLDivElement>()
const mergeMP3 = ref<HTMLAudioElement>()
const noMP3 = ref<HTMLAudioElement>()
const map: number[][] = Array.from(new Array(5), () => new Array(5).fill(0))

let gameIsOver = false
const searchOneEmpty = (): false | empty => {
  let empty: empty[] = []
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      if (map[i][j] === 0) {
        empty.push([i, j])
      }
    }
  }
  if (empty.length < 1) return false
  else {
    let index1 = Math.floor(Math.random() * empty.length)
    return empty[index1]
  }
}
const mapAddOneNumber = (): void => {
  let empty = searchOneEmpty()
  if (empty === false) {
    gameover()
    return
  }
  let random = Math.random()
  if (random < 1 / 128) {
    newRandomCard(empty[0], empty[1], 8)
  } else if (random < 1 / 16) {
    newRandomCard(empty[0], empty[1], 4)
  } else {
    newRandomCard(empty[0], empty[1], 2)
  }
}
const newRandomCard = (x: number, y: number, z: number): void => {
  map[x][y] = z
  const box1 = document.createElement('div')
  box1.classList.add('card', `card-${z}`, `position-${x}-${y}`, 'init')
  cardContent.value?.appendChild(box1)
  setTimeout(() => {
    box1.classList.remove('init')
  }, 500)
}
const searchTwoEmpty = (): false | empty[] => {
  let empty: empty[] = []
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      if (map[i][j] === 0) {
        empty.push([i, j])
      }
    }
  }
  if (empty.length < 2) return false
  else {
    let index1 = Math.floor(Math.random() * empty.length)
    let index2 = Math.floor(Math.random() * empty.length)
    while (index1 === index2) index2 = Math.floor(Math.random() * empty.length)
    return [empty[index1], empty[index2]]
  }
}
const gameover = (): void => {
  if (gameoverButton.value) gameoverButton.value.style.display = 'flex'
  gameIsOver = true
  game_remove_event()
  upload_grade()
}
const mapAddTowNumber = (): void => {
  let empty = searchTwoEmpty()
  if (empty === false) {
    gameover()
    return
  }
  map[empty[0][0]][empty[0][1]] = 2
  map[empty[1][0]][empty[1][1]] = 2
  const box1 = document.createElement('div')
  const box2 = document.createElement('div')
  box1.classList.add('card', 'card-2', `position-${empty[0][0]}-${empty[0][1]}`)
  box2.classList.add('card', 'card-2', `position-${empty[1][0]}-${empty[1][1]}`)
  cardContent.value?.appendChild(box1)
  cardContent.value?.appendChild(box2)
}
const moveCardOnDirection = (d: direction): void => {
  if (d === direction.up) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = 2; j <= map.length - 1; j++) {
        if (map[j][i] !== 0 && map[j - 1][i] === 0) {
          let t = j
          let dom = document.querySelector(`.position-${j}-${i}`)
          while (map[t - 1][i] === 0 && t > 1) {
            map[t - 1][i] = map[t][i]
            map[t][i] = 0
            t--
          }
          dom?.classList.remove(`position-${j}-${i}`)
          dom?.classList.add(`position-${t}-${i}`)
        }
      }
    }
    return
  } else if (d === direction.left) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = 2; j <= map.length - 1; j++) {
        if (map[i][j] !== 0 && map[i][j - 1] === 0) {
          let t = j
          let dom = document.querySelector(`.position-${i}-${j}`)
          while (map[i][t - 1] === 0 && t > 1) {
            map[i][t - 1] = map[i][t]
            map[i][t] = 0
            t--
          }
          dom?.classList.remove(`position-${i}-${j}`)
          dom?.classList.add(`position-${i}-${t}`)
        }
      }
    }

    return
  } else if (d === direction.down) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = map.length - 2; j >= 1; j--) {
        if (map[j][i] !== 0 && map[j + 1][i] === 0) {
          let t = j
          let dom = document.querySelector(`.position-${j}-${i}`)
          while (t < 4 && map[t + 1][i] === 0) {
            map[t + 1][i] = map[t][i]
            map[t][i] = 0
            t++
          }
          dom?.classList.remove(`position-${j}-${i}`)
          dom?.classList.add(`position-${t}-${i}`)
        }
      }
    }
    return
  } else if (d === direction.right) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = map.length - 2; j >= 1; j--) {
        if (map[i][j] !== 0 && map[i][j + 1] === 0) {
          let t = j
          let dom = document.querySelector(`.position-${i}-${j}`)
          while (t < 4 && map[i][t + 1] === 0) {
            map[i][t + 1] = map[i][t]
            map[i][t] = 0
            t++
          }
          dom?.classList.remove(`position-${i}-${j}`)
          dom?.classList.add(`position-${i}-${t}`)
        }
      }
    }
    return
  }
}
const cardMerge = (d: direction): void => {
  let hasMerge = false
  if (d === direction.up) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = 2; j <= map.length - 1; j++) {
        if (map[j][i] === map[j - 1][i] && map[j][i] !== 0) {
          let dom: HTMLDivElement | null = document.querySelector(`.position-${j - 1}-${i}`)
          let deleteDom: HTMLDivElement | null = document.querySelector(`.position-${j}-${i}`)
          dom?.classList.remove(`card-${map[j - 1][i]}`)
          dom?.classList.add(`card-${map[j - 1][i] + map[j - 1][i]}`)
          dom?.classList.toggle('big')
          grade.value += map[j - 1][i] * 2

          setTimeout(() => {
            dom?.classList.toggle('big')
          }, 300)
          if (deleteDom) {
            deleteDom.classList.remove(`position-${j}-${i}`)
            let top = 15 + (98.75 + 15) * (j - 2) + 'px'
            let left = 15 + (98.75 + 15) * (i - 1) + 'px'
            deleteDom.style.top = top
            deleteDom.style.left = left
            deleteDom.style.zIndex = '3'
          }
          setTimeout(() => {
            deleteDom && cardContent.value?.removeChild(deleteDom)
          }, 100)
          map[j - 1][i] = map[j - 1][i] + map[j - 1][i]
          map[j][i] = 0
          hasMerge = true
        }
      }
    }
  } else if (d === direction.left) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = 2; j <= map.length - 1; j++) {
        if (map[i][j] === map[i][j - 1] && map[i][j] !== 0) {
          let dom: HTMLDivElement | null = document.querySelector(`.position-${i}-${j - 1}`)
          let deleteDom: HTMLDivElement | null = document.querySelector(`.position-${i}-${j}`)
          dom?.classList.remove(`card-${map[i][j - 1]}`)
          dom?.classList.add(`card-${map[i][j - 1] + map[i][j - 1]}`)
          dom?.classList.toggle('big')
          grade.value += map[i][j - 1] * 2
          setTimeout(() => {
            dom?.classList.toggle('big')
          }, 300)
          if (deleteDom) {
            deleteDom.classList.remove(`position-${i}-${j}`)
            let top = 15 + (98.75 + 15) * (i - 1) + 'px'
            let left = 15 + (98.75 + 15) * (j - 2) + 'px'
            deleteDom.style.top = top
            deleteDom.style.left = left
            deleteDom.style.zIndex = '3'
          }
          setTimeout(() => {
            deleteDom && cardContent.value?.removeChild(deleteDom)
          }, 100)
          map[i][j - 1] = map[i][j - 1] + map[i][j - 1]
          map[i][j] = 0
          hasMerge = true
        }
      }
    }
  } else if (d === direction.down) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = map.length - 2; j >= 1; j--) {
        if (map[j][i] === map[j + 1][i] && map[j][i] !== 0) {
          let dom: HTMLDivElement | null = document.querySelector(`.position-${j + 1}-${i}`)
          let deleteDom: HTMLDivElement | null = document.querySelector(`.position-${j}-${i}`)
          dom?.classList.remove(`card-${map[j + 1][i]}`)
          dom?.classList.add(`card-${map[j + 1][i] + map[j + 1][i]}`)
          dom?.classList.toggle('big')
          grade.value += map[j + 1][i] * 2
          setTimeout(() => {
            dom?.classList.toggle('big')
          }, 300)
          if (deleteDom) {
            deleteDom.classList.remove(`position-${j}-${i}`)
            let top = 15 + (98.75 + 15) * j + 'px'
            let left = 15 + (98.75 + 15) * (i - 1) + 'px'
            deleteDom.style.top = top
            deleteDom.style.left = left
            deleteDom.style.zIndex = '3'
          }
          setTimeout(() => {
            deleteDom && cardContent.value?.removeChild(deleteDom)
          }, 100)
          map[j + 1][i] = map[j + 1][i] + map[j + 1][i]
          map[j][i] = 0
          hasMerge = true
        }
      }
    }
  } else if (d === direction.right) {
    for (let i = 1; i <= map.length - 1; i++) {
      for (let j = map.length - 2; j >= 1; j--) {
        if (map[i][j] === map[i][j + 1] && map[i][j] !== 0) {
          let dom: HTMLDivElement | null = document.querySelector(`.position-${i}-${j + 1}`)
          let deleteDom: HTMLDivElement | null = document.querySelector(`.position-${i}-${j}`)
          dom?.classList.remove(`card-${map[i][j + 1]}`)
          dom?.classList.add(`card-${map[i][j + 1] + map[i][j + 1]}`)
          dom?.classList.toggle('big')
          grade.value += map[i][j + 1] * 2
          setTimeout(() => {
            dom?.classList.toggle('big')
          }, 300)
          if (deleteDom) {
            deleteDom.classList.remove(`position-${i}-${j}`)
            let top = 15 + (98.75 + 15) * (i - 1) + 'px'
            let left = 15 + (98.75 + 15) * j + 'px'
            deleteDom.style.top = top
            deleteDom.style.left = left
            deleteDom.style.zIndex = '3'
          }
          setTimeout(() => {
            deleteDom && cardContent.value?.removeChild(deleteDom)
          }, 100)
          map[i][j + 1] = map[i][j + 1] + map[i][j + 1]
          map[i][j] = 0
          hasMerge = true
        }
      }
    }
  }

  if (hasMerge && mergeMP3.value && props.musicState) {
    mergeMP3.value.currentTime = 0
    mergeMP3.value.play()
  }
}
const moveCard = (d: direction): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let mapcopy: number[][] = []
    for (let i = 0; i < map.length; i++) {
      let t = [...map[i]]
      mapcopy.push(t)
    }
    moveCardOnDirection(d)
    cardMerge(d)
    moveCardOnDirection(d)
    setTimeout(() => {
      let allNotEmpty = true
      for (let i = 1; i < map.length; i++) {
        for (let j = 1; j < map.length; j++) {
          if (mapcopy[i][j] !== map[i][j]) {
            resolve(true)
            return
          }
          if (map[i][j] === 0) allNotEmpty = false
        }
      }
      if (!allNotEmpty) {
        if (noMP3.value && !gameIsOver && props.musicState) {
          noMP3.value.currentTime = 0
          noMP3.value.play()
        }

        console.log('还有空位')
        resolve(false)
        return
      }
      let x = [0, 1, 0, -1],
        y = [-1, 0, 1, 0]
      for (let i = 1; i < map.length; i++) {
        for (let j = 1; j < map.length; j++) {
          for (let z = 0; z < 4; z++) {
            let tx = i + x[z],
              ty = j + y[z]
            if (tx < 1 || tx === map.length || ty < 1 || ty === map.length) continue
            if (map[tx][ty] === map[i][j]) {
              console.log('还可以走一步')

              resolve(false)
              return
            }
          }
        }
      }
      resolve(true)
    }, 0)
  })
}
const handleKey = async (e: any) => {
  let dir: direction | null = null
  switch (e.key) {
    case 'w': {
      dir = direction.up
      break
    }
    case 's': {
      dir = direction.down

      break
    }
    case 'a': {
      dir = direction.left
      break
    }
    case 'd': {
      dir = direction.right
      break
    }
    case 'ArrowUp': {
      e.preventDefault()
      dir = direction.up
      break
    }
    case 'ArrowLeft': {
      e.preventDefault()
      dir = direction.left
      break
    }
    case 'ArrowRight': {
      e.preventDefault()
      dir = direction.right
      break
    }
    case 'ArrowDown': {
      e.preventDefault()
      dir = direction.down
      break
    }
  }
  if (dir !== null) {
    ;(await moveCard(dir)) && mapAddOneNumber()
  }
}
const anewGame = (fromGameOver: boolean = false) => {
  game_add_event()
  if (gameoverButton.value) gameoverButton.value.style.display = 'none'
  if (cardContent.value) {
    cardContent.value.innerHTML = ''
    for (let i = 0; i < map.length; i++) {
      map[i].fill(0)
    }
  }
  let localGrage = localStorage.getItem('2048Grage')
  if (localGrage) {
    let t = parseInt(localGrage)
    if (t < grade.value) localStorage.setItem('2048Grage', grade.value + '')
    emit('ongameover')
  } else {
    localStorage.setItem('2048Grage', grade.value + '')
  }
  if (grade.value !== 0 && !fromGameOver) {
    upload_grade()
    console.log('上传成绩')
  }
  grade.value = 0
  gameIsOver = false
  mapAddTowNumber()
}

const upload_grade = () => {
  axios.post(import.meta.env.VITE_BASE_URL + '/list', {
    data: {
      user_name: window.user.username,
      photo: window.user.photo,
      score: grade.value,
      openid: window.user.openid,
    },
  })
}

onMounted(() => {
  mapAddTowNumber()
  game_add_event()
})
onUnmounted(() => {
  game_remove_event()
})
defineExpose({
  anewGame,
  handleKey,
  grade,
})
</script>

<style scoped lang="less">
.game {
  height: 100%;
  width: 100%;
  padding: 15px;
  background-color: var(--map-color);
  position: relative;
}
.row {
  height: calc(395px / 4);
  width: 100%;
  margin: 0 0 15px 0;
}
.col {
  height: 100%;
  width: calc(395px / 4);
  background-color: var(--map-box-color);
  display: inline-block;
  margin-right: 15px;
}
.col-4 {
  margin-right: 0px;
}
.row-4 {
  margin-bottom: 0px;
}
.card-content {
  z-index: 2;
}
.gameover {
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(238, 228, 218, 0.5);
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  flex-direction: column;

  &-box {
    color: var(--base-color);
    font-size: 30px;
    font-weight: 700;
    margin-top: -30px;
    margin-bottom: 50px;
    text-align: center;
  }

  &-button {
    width: 180px;
    height: 60px;
    color: white;
    background-color: var(--base-color);
    font-size: 30px;
    text-align: center;
    letter-spacing: 3px;
    line-height: 60px;
    border-radius: 20px;
    cursor: pointer;
    user-select: none;
  }
  &-button:active {
    transform: scale(0.8);
  }
}
</style>
