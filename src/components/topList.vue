<template>
  <div class="list">
    <div class="list-header">
      <div class="list-col list-col-1">#</div>
      <div class="list-col list-col-2">用户名</div>
      <div class="list-col list-col-3">分数</div>
      <div class="list-col list-col-4">提交日期</div>
    </div>

    <div class="list-body" v-for="(item, index) in topList" :key="item.id">
      <div class="list-col list-col-1">{{ index + 1 }}</div>
      <div class="list-col list-col-2">
        <img :src="item.photo" alt="头像" />
        {{ item.user_name }}
      </div>
      <div class="list-col list-col-3">{{ item.score }}</div>
      <div class="list-col list-col-4">{{ getData(item.create_time) }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { itopList } from './topList.type'
import { onMounted, ref } from 'vue'
import { getData } from '../utils/getDate'
let topList = ref<itopList[]>([])
const getList = async () => {
  let data = (await (
    await axios.get('https://app464.acapp.acwing.com.cn:20443/2048/top/list')
  ).data) as itopList[]
  topList.value = data
  console.log(topList.value)
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
