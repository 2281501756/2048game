export type itopList = {
  id: string
  openid: string
  score: number
  create_time: string
  user: {
    user_name: string
    photo: string
    openid: string
    create_time: string
    id: string
  }
}

export enum list {
  top,
  time,
}
