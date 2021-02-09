/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写华联万柳token。
//注：github action用户cookie填写到Settings-Secrets里面，新增 ACCESS_TOKEN，多个使用`&`隔开或者换行
let AccessToken = ['5fb23765e4b03ea8ee0ecfdb', '5f5c575a1170dd0e75b724d9']

// 判断github action里面是否有华联万柳 AccessToken
if (process.env.ACCESS_TOKEN) {
  if (process.env.ACCESS_TOKEN.indexOf('&') > -1) {
    console.log(`您的 ACCESS_TOKEN 选择的是用&隔开\n`)
    AccessToken = process.env.ACCESS_TOKEN.split('&')
  } else if (process.env.ACCESS_TOKEN.indexOf('\n') > -1) {
    console.log(`您的 ACCESS_TOKEN 选择的是用换行隔开\n`)
    AccessToken = process.env.ACCESS_TOKEN.split('\n')
  } else {
    AccessToken = process.env.ACCESS_TOKEN.split()
  }
  console.log(`\n====================共有 ${AccessToken.length} 个华联万柳的 AccessToken=========\n`)
  console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString()}=====================\n`)
  // console.log(`\n==================脚本执行来自 github action=====================\n`)
}

for (let i = 0; i < AccessToken.length; i++) {
  const index = i + 1 === 1 ? '' : i + 1
  exports['AccessToken' + index] = AccessToken[i]
}
