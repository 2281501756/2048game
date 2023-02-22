import axios from 'axios'

const login = async () => {
  let AcWingOS = window.AcWingOS
  if (!AcWingOS) {
    window.user = {
      username: '未登录',
      photo: 'https://cdn.acwing.com/media/file_system/file/application/icon/OIP-C_lcxh2Rr.jpg',
      access_token: '',
      refresh_token: '',
      openid: '',
    }
    return
  }
  let apply_code = await axios.get(import.meta.env.VITE_BASE_URL + '/apply/code')
  if (apply_code.data.result !== 'success') return
  let { appid, redirect_uri, scope, state } = apply_code.data.code
  AcWingOS.api.oauth2.authorize(appid, redirect_uri, scope, state, (res: any) => {
    window.user = res.data
  })
  window.AcWingOS.api.window.resize(
    (600 * 100) / window.innerWidth,
    (670 * 100 * 18) / window.innerHeight / 17
  )
}

login()
