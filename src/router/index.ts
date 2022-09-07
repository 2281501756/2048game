import { ref } from 'vue'
const router = ref('home')
const setRouter = (T: string) => {
  router.value = T
}

export const useRouter = () => {
  return { router, setRouter }
}
