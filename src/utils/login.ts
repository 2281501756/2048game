import axios from 'axios'

export const login = async () => {
  let AcWingOS = window.AcWingOS
  if (!AcWingOS) return
  let apply_code = await axios.get('https://app464.acapp.acwing.com.cn:20443/2048/apply/code')
  if (apply_code.data.result !== 'success') return
  let { appid, redirect_uri, scope, state } = apply_code.data.code
  AcWingOS.api.oauth2.authorize(appid, redirect_uri, scope, state, (res: any) => {
    window.user = res.data
  })
}

