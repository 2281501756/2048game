import { Empty, Direction } from './type'
import './logic.css'
import { useColorFontDate } from './data'
import { ref, Ref } from 'vue'

export default class Game {
  public map: number[][] // 逻辑地图
  public cardMap: HTMLDivElement[][] // 实际地图
  public style // 样式
  constructor(
    public width: number,
    public height: number,
    public row: number,
    public col: number,
    public interval: number,
    public dom: HTMLElement,
    public score: Ref<number>,
    public option: { prob4: number; prob8: number; prob16: number } = {
      prob4: 1 / 16,
      prob8: 1 / 128,
      prob16: 0,
    }
  ) {
    this.map = Array.from(new Array(this.row + 1), () => new Array(this.col + 1).fill(0))
    this.cardMap = Array.from(new Array(this.row + 1), () => new Array(this.col + 1).fill(null))
    this.style = useColorFontDate(width / row)
    this.createMap()
    this.randomTowCard()
    this.dom.addEventListener('keydown', this.handleKey.bind(this), false)
  }
  // 创建地图
  createMap() {
    this.dom.style.width = this.width + 'px'
    this.dom.style.height = this.height + 'px'
    this.dom.style.padding = this.interval + 'px'
    this.dom.style.position = 'relative'
    this.dom.style.outline = 'none'
    this.dom.tabIndex = 1
    for (let i = 0; i < this.row; i++) {
      let T: HTMLDivElement = document.createElement('div')

      for (let j = 0; j < this.col; j++) {
        let d = document.createElement('div')
        d.style.height = (this.height - this.interval * (this.row + 1)) / this.row + 'px'
        d.style.width = (this.width - this.interval * (this.col + 1)) / this.col + 'px'
        d.style.display = 'inline-block'
        d.style.backgroundColor = 'rgba(238, 228, 218, 0.35)'
        if (j !== this.col - 1) {
          d.style.marginRight = this.interval + 'px'
        }
        T.appendChild(d)
      }
      T.style.height = (this.height - this.interval * (this.row + 1)) / this.row + 'px'
      T.style.width = '100%'
      if (i !== this.row - 1) {
        T.style.marginBottom = this.interval + 'px'
      }
      this.dom.appendChild(T)
    }
  }
  // 设置方块大小和位置
  setPosition(dom: HTMLElement, row: number, col: number, n: number) {
    let h = (this.height - this.interval * (this.row + 1)) / this.row
    let w = (this.width - this.interval * (this.col + 1)) / this.col
    dom.style.position = 'absolute'
    dom.style.height = h + 'px'
    dom.style.width = w + 'px'
    dom.style.top = this.interval * row + h * (row - 1) + 'px'
    dom.style.left = this.interval * col + w * (col - 1) + 'px'
    dom.innerHTML = '' + n
    dom.style.color = this.style.get(n)?.color as string
    dom.style.fontSize = this.style.get(n)?.fontSize + 'px'
    dom.style.backgroundColor = this.style.get(n)?.backgroundColor as string
  }
  // 寻找一个空位置
  searchOneEmpty(): false | Empty {
    let empty: Empty[] = []
    for (let i = 1; i <= this.row; i++) {
      for (let j = 1; j <= this.col; j++) {
        if (this.map[i][j] === 0) {
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
  // 寻找两个空位置
  searchTwoEmpty(): false | Empty[] {
    let empty: Empty[] = []
    for (let i = 1; i <= this.row; i++) {
      for (let j = 1; j <= this.col; j++) {
        if (this.map[i][j] === 0) {
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
  // 创建方块设置方块样式
  createCard(x: number, y: number, z: number): void {
    this.map[x][y] = z
    const box = document.createElement('div')
    box.classList.add('block')
    box.classList.add('block-init')
    this.setPosition(box, x, y, z)
    this.cardMap[x][y] = box
    this.dom.appendChild(box)
  }
  // 随机生成一种样式的方块
  randomOneCard(): void {
    let empty = this.searchOneEmpty()
    if (empty === false) {
      this.gameover()
      return
    }
    let random = Math.random()
    console.log(this.option)
    if (this.option.prob16 && random < this.option.prob16) {
      this.createCard(empty[0], empty[1], 16)
    } else if (this.option.prob8 && random < this.option.prob8 + this.option.prob16) {
      this.createCard(empty[0], empty[1], 8)
    } else if (
      this.option.prob4 &&
      random < this.option.prob4 + this.option.prob16 + this.option.prob8
    ) {
      this.createCard(empty[0], empty[1], 4)
    } else {
      this.createCard(empty[0], empty[1], 2)
    }
  }
  // 随机生成两个方块
  randomTowCard() {
    let empty = this.searchTwoEmpty()
    if (empty === false) {
      this.gameover()
      return
    }
    this.createCard(empty[0][0], empty[0][1], 2)
    this.createCard(empty[1][0], empty[1][1], 2)
  }
  gameover() {
    console.log('游戏结束')

    // gameIsOver = true
    // game_remove_event()
    // upload_grade()
  }
  // 方块靠边核心
  moveCardOnDirection(d: Direction) {
    switch (d) {
      case Direction.up: {
        for (let i = 1; i <= this.col; i++) {
          for (let j = 2; j <= this.row; j++) {
            if (this.map[j][i] !== 0 && this.map[j - 1][i] === 0) {
              let t = j
              let dom = this.cardMap[j][i]
              while (this.map[t - 1][i] === 0 && t > 1) {
                this.map[t - 1][i] = this.map[t][i]
                this.map[t][i] = 0
                t--
              }
              this.setPosition(dom, t, i, this.map[t][i])
              this.cardMap[t][i] = dom
            }
          }
        }
        return
      }
      case Direction.left: {
        for (let i = 1; i <= this.row; i++) {
          for (let j = 2; j <= this.col; j++) {
            if (this.map[i][j] !== 0 && this.map[i][j - 1] === 0) {
              let t = j
              let dom = this.cardMap[i][j]
              while (this.map[i][t - 1] === 0 && t > 1) {
                this.map[i][t - 1] = this.map[i][t]
                this.map[i][t] = 0
                t--
              }
              this.setPosition(dom, i, t, this.map[i][t])
              this.cardMap[i][t] = dom
            }
          }
        }
        return
      }
      case Direction.down: {
        for (let i = 1; i <= this.col; i++) {
          for (let j = this.row - 1; j >= 1; j--) {
            if (this.map[j][i] !== 0 && this.map[j + 1][i] === 0) {
              let t = j
              let dom = this.cardMap[j][i]
              while (t < this.row && this.map[t + 1][i] === 0) {
                this.map[t + 1][i] = this.map[t][i]
                this.map[t][i] = 0
                t++
              }
              this.setPosition(dom, t, i, this.map[t][i])
              this.cardMap[t][i] = dom
            }
          }
        }
        return
      }
      case Direction.right: {
        for (let i = 1; i <= this.row; i++) {
          for (let j = this.col - 1; j >= 1; j--) {
            if (this.map[i][j] !== 0 && this.map[i][j + 1] === 0) {
              let t = j
              let dom = this.cardMap[i][j]
              while (t < this.col && this.map[i][t + 1] === 0) {
                this.map[i][t + 1] = this.map[i][t]
                this.map[i][t] = 0
                t++
              }
              this.setPosition(dom, i, t, this.map[i][t])
              this.cardMap[i][t] = dom
            }
          }
        }
        return
      }
    }
  }

  cardMerge(d: Direction): void {
    if (d === Direction.up) {
      for (let i = 1; i <= this.col; i++) {
        for (let j = 2; j <= this.row; j++) {
          if (this.map[j][i] === this.map[j - 1][i] && this.map[j][i] !== 0) {
            let dom = this.cardMap[j - 1][i]
            let deleteDom = this.cardMap[j][i]
            this.setPosition(dom, j - 1, i, this.map[j][i] * 2)
            this.score.value += this.map[j][i] * 2
            dom.classList.toggle('big')
            dom.classList.remove('block-init')
            setTimeout(() => {
              dom.classList.toggle('big')
            }, 300)

            deleteDom.style.zIndex = '3'
            this.setPosition(deleteDom, j - 1, i, this.map[j][i])

            setTimeout(() => {
              this.dom.removeChild(deleteDom)
            }, 100)
            this.map[j - 1][i] = this.map[j - 1][i] * 2
            this.map[j][i] = 0
          }
        }
      }
    } else if (d === Direction.left) {
      for (let i = 1; i <= this.row; i++) {
        for (let j = 2; j <= this.col; j++) {
          if (this.map[i][j] === this.map[i][j - 1] && this.map[i][j] !== 0) {
            let dom = this.cardMap[i][j - 1]
            let deleteDom = this.cardMap[i][j]
            this.setPosition(dom, i, j - 1, this.map[i][j] * 2)
            this.score.value += this.map[i][j] * 2
            dom.classList.toggle('big')
            dom.classList.remove('block-init')
            setTimeout(() => {
              dom.classList.toggle('big')
            }, 300)
            deleteDom.style.zIndex = '3'
            this.setPosition(deleteDom, i, j - 1, this.map[i][j])

            setTimeout(() => {
              this.dom.removeChild(deleteDom)
            }, 100)
            this.map[i][j - 1] = this.map[i][j - 1] * 2
            this.map[i][j] = 0
          }
        }
      }
    } else if (d === Direction.down) {
      for (let i = 1; i <= this.col; i++) {
        for (let j = this.row - 1; j >= 1; j--) {
          if (this.map[j][i] === this.map[j + 1][i] && this.map[j][i] !== 0) {
            let dom = this.cardMap[j + 1][i]
            let deleteDom = this.cardMap[j][i]
            this.setPosition(dom, j + 1, i, this.map[j][i] * 2)
            this.score.value += this.map[j][i] * 2
            dom.classList.toggle('big')
            dom.classList.remove('block-init')
            setTimeout(() => {
              dom.classList.toggle('big')
            }, 300)
            deleteDom.style.zIndex = '3'
            this.setPosition(deleteDom, j + 1, i, this.map[j][i])
            setTimeout(() => {
              this.dom.removeChild(deleteDom)
            }, 100)
            this.map[j + 1][i] = this.map[j + 1][i] * 2
            this.map[j][i] = 0
          }
        }
      }
    } else if (d === Direction.right) {
      for (let i = 1; i <= this.row; i++) {
        for (let j = this.col - 1; j >= 1; j--) {
          if (this.map[i][j] === this.map[i][j + 1] && this.map[i][j] !== 0) {
            let dom = this.cardMap[i][j + 1]
            let deleteDom = this.cardMap[i][j]
            this.setPosition(dom, i, j + 1, this.map[i][j] * 2)
            this.score.value += this.map[j][i] * 2
            dom?.classList.toggle('big')
            dom.classList.remove('block-init')
            setTimeout(() => {
              dom?.classList.toggle('big')
            }, 300)
            deleteDom.style.zIndex = '3'
            this.setPosition(deleteDom, i, j + 1, this.map[i][j])
            setTimeout(() => {
              this.dom.removeChild(deleteDom)
            }, 100)
            this.map[i][j + 1] = this.map[i][j + 1] * 2
            this.map[i][j] = 0
          }
        }
      }
    }
  }

  moveCard(d: Direction) {
    let mapcopy: number[][] = []
    for (let i = 0; i < this.map.length; i++) {
      let t = [...this.map[i]]
      mapcopy.push(t)
    }
    this.moveCardOnDirection(d)
    this.cardMerge(d)
    this.moveCardOnDirection(d)

    let allNotEmpty = true
    for (let i = 1; i <= this.row; i++) {
      for (let j = 1; j <= this.col; j++) {
        if (mapcopy[i][j] !== this.map[i][j]) {
          return true
        }
        if (this.map[i][j] === 0) allNotEmpty = false
      }
    }
    if (!allNotEmpty) {
      console.log('还有空位')
      return false
    }
    // let x = [0, 1, 0, -1],
    //   y = [-1, 0, 1, 0]
    // for (let i = 1; i < this.map.length; i++) {
    //   for (let j = 1; j < this.map.length; j++) {
    //     for (let z = 0; z < 4; z++) {
    //       let tx = i + x[z],
    //         ty = j + y[z]
    //       if (tx < 1 || tx === this.map.length || ty < 1 || ty === this.map.length) continue
    //       if (this.map[tx][ty] === this.map[i][j]) {
    //         console.log('还可以走一步')

    //         return false
    //       }
    //     }
    //   }
    // }
    // return true
  }

  async handleKey(e: any) {
    let dir: Direction | null = null
    switch (e.key) {
      case 'w': {
        dir = Direction.up
        break
      }
      case 's': {
        dir = Direction.down

        break
      }
      case 'a': {
        dir = Direction.left
        break
      }
      case 'd': {
        dir = Direction.right
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        dir = Direction.up
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        dir = Direction.left
        break
      }
      case 'ArrowRight': {
        e.preventDefault()
        dir = Direction.right
        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        dir = Direction.down
        break
      }
    }
    if (dir !== null) {
      this.moveCard(dir)
      this.randomOneCard()
    }
  }
  anewGame() {
    this.map = Array.from(new Array(this.row + 1), () => new Array(this.col + 1).fill(0))
    this.cardMap = Array.from(new Array(this.row + 1), () => new Array(this.col + 1).fill(null))
    this.dom.innerHTML = ''
    this.score.value = 0
    this.createMap()
    this.randomTowCard()
  }
}
