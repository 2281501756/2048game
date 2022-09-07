<template>
  <div class="list">
    <div class="list-header">
      <div class="list-col list-col-1">#</div>
      <div class="list-col list-col-2">用户名</div>
      <div class="list-col list-col-3">分数</div>
      <div class="list-col list-col-4">提交日期</div>
    </div>

    <div class="list-body" v-for="(item, index) in topList" :key="item.id">
      <template v-if="props.type === list.top">
        <div class="list-col list-col-1">{{ index + 1 }}</div>
        <div class="list-col list-col-2">
          <img :src="item.user.photo" alt="头像" />
          {{ item.user.user_name }}
        </div>
        <div class="list-col list-col-3">{{ item.score }}</div>
        <div class="list-col list-col-4">{{ getData(item.create_time) }}</div>
      </template>
      <template v-else>
        <div class="list-col list-col-1">{{ index + 1 }}</div>
        <div class="list-col list-col-2">
          <img :src="item.user.photo" alt="头像" />
          {{ item.user.user_name }}
        </div>
        <div class="list-col list-col-3">{{ item.score }}</div>
        <div class="list-col list-col-4">{{ YYYYMMDDHMS(item.create_time) }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { itopList } from './topList.type'
import { effect, onMounted, ref } from 'vue'
import { getData, YYYYMMDDHMS } from '../utils/getDate'
import { list } from './topList.type'
const props = defineProps<{
  type: list
}>()
const URL = [
  import.meta.env.VITE_BASE_URL + '/top/list',
  import.meta.env.VITE_BASE_URL + '/active/list',
]
let topList = ref<itopList[]>([])
const getList = async () => {
  let data = (await (await axios.get(URL[props.type])).data) as itopList[]
  topList.value = data
}

defineExpose({
  getList,
})
onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.list-header {
  height: 32px;
  font-size: 18px;
  font-weight: 500;
}
.list-col {
  display: inline-block;
}
.list-col-1 {
  width: 50px;
}
.list-col-2 {
  width: 210px;
}
.list-col-3 {
  width: 120px;
}
.list-col-4 {
  width: 120px;
}
img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
}
</style>
