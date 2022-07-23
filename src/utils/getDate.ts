export const getData = (time: any) => {
  let t = new Date(time)
  let year: number | string = t.getFullYear()
  let month: number | string = t.getMonth() + 1
  let day: number | string = t.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return `${year}/${month}/${day}`
}
