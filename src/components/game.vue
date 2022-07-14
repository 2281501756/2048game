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
      <div @click="anewGame">从新开始</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { empty, direction } from './game.type'
const cardContent = ref<HTMLDivElement>()
const gameoverButton = ref<HTMLDivElement>()
const map: number[][] = Array.from(new Array(5), () => new Array(5).fill(0))
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
}
const mapAddNumber = (): void => {
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
    for (let i = 1; i <= 4; i++) {
      for (let j = 2; j <= 4; j++) {
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
    for (let i = 1; i <= 4; i++) {
      for (let j = 2; j <= 4; j++) {
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
    for (let i = 1; i <= 4; i++) {
      for (let j = 3; j >= 1; j--) {
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
    for (let i = 1; i <= 4; i++) {
      for (let j = 3; j >= 1; j--) {
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
  if (d === direction.up) {
    for (let i = 1; i <= 4; i++) {
      for (let j = 2; j <= 4; j++) {
        if (map[j][i] === map[j - 1][i]) {
          let dom = document.querySelector(`.position-${j - 1}-${i}`)
          let deleteDom = document.querySelector(`.position-${j}-${i}`)
          dom?.classList.remove(`card-${map[j - 1][i]}`)
          dom?.classList.add(`card-${map[j - 1][i] + map[j - 1][i]}`)
          // deleteDom?.classList.add('index-3')
          // deleteDom?.classList.add(`position-${j - 1}-${i}`)
          // setTimeout(() => {
          deleteDom && cardContent.value?.removeChild(deleteDom)
          // }, 150)
          map[j - 1][i] = map[j - 1][i] + map[j - 1][i]
          map[j][i] = 0
        }
      }
    }
    return
  } else if (d === direction.left) {
    for (let i = 1; i <= 4; i++) {
      for (let j = 2; j <= 4; j++) {
        if (map[i][j] === map[i][j - 1]) {
          let dom = document.querySelector(`.position-${i}-${j - 1}`)
          let deleteDom = document.querySelector(`.position-${i}-${j}`)
          dom?.classList.remove(`card-${map[i][j - 1]}`)
          dom?.classList.add(`card-${map[i][j - 1] + map[i][j - 1]}`)
          // deleteDom?.classList.add('index-3')
          // deleteDom?.classList.add(`position-${i}-${j - 1}`)
          // setTimeout(() => {
          deleteDom && cardContent.value?.removeChild(deleteDom)
          // }, 150)
          map[i][j - 1] = map[i][j - 1] + map[i][j - 1]
          map[i][j] = 0
        }
      }
    }

    return
  } else if (d === direction.down) {
    for (let i = 1; i <= 4; i++) {
      for (let j = 3; j >= 1; j--) {
        if (map[j][i] === map[j + 1][i]) {
          let dom = document.querySelector(`.position-${j + 1}-${i}`)
          let deleteDom = document.querySelector(`.position-${j}-${i}`)
          dom?.classList.remove(`card-${map[j + 1][i]}`)
          dom?.classList.add(`card-${map[j + 1][i] + map[j + 1][i]}`)
          // deleteDom?.classList.add('index-3')
          // deleteDom?.classList.add(`position-${j + 1}-${i}`)
          // setTimeout(() => {
          deleteDom && cardContent.value?.removeChild(deleteDom)
          // }, 150)
          map[j + 1][i] = map[j + 1][i] + map[j + 1][i]
          map[j][i] = 0
        }
      }
    }
    return
  } else if (d === direction.right) {
    for (let i = 1; i <= 4; i++) {
      for (let j = 3; j >= 1; j--) {
        if (map[i][j] === map[i][j + 1]) {
          let dom = document.querySelector(`.position-${i}-${j + 1}`)
          let deleteDom = document.querySelector(`.position-${i}-${j}`)
          dom?.classList.remove(`card-${map[i][j + 1]}`)
          dom?.classList.add(`card-${map[i][j + 1] + map[i][j + 1]}`)
          // deleteDom?.classList.add('index-3')
          // deleteDom?.classList.add(`position-${i}-${j + 1}`)
          // setTimeout(() => {
          deleteDom && cardContent.value?.removeChild(deleteDom)
          // }, 150)
          map[i][j + 1] = map[i][j + 1] + map[i][j + 1]
          map[i][j] = 0
        }
      }
    }
    return
  }
}
const moveCard = (d: direction) => {
  return new Promise((resolve, reject) => {
    moveCardOnDirection(d)
    cardMerge(d)
    moveCardOnDirection(d)
    setTimeout(() => {
      resolve(null)
    }, 300)
  })
}
const handleKey = async (e: any) => {
  switch (e.key) {
    case 'w': {
      await moveCard(direction.up)
      mapAddNumber()
      break
    }
    case 's': {
      await moveCard(direction.down)
      mapAddNumber()

      break
    }
    case 'a': {
      await moveCard(direction.left)
      mapAddNumber()
      break
    }
    case 'd': {
      await moveCard(direction.right)
      mapAddNumber()
      break
    }
  }
}
const anewGame = () => {
  if (gameoverButton.value) gameoverButton.value.style.display = 'none'
  if (cardContent.value) {
    cardContent.value.innerHTML = ''
    for (let i = 0; i < map.length; i++) {
      map[i].fill(0)
    }
  }
  mapAddNumber()
}
window.addEventListener('keydown', handleKey, false)
onMounted(() => {
  mapAddNumber()
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKey, false)
})
defineExpose({
  anewGame,
})
</script>

<style scoped>
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
  margin-bottom: 15px;
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
}
.gameover > div {
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
.gameover > div:active {
  transform: scale(0.8);
}
</style>
