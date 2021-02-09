const qs = require('qs')
const got = require('got')

const bhgTokenNode = require('./bhgAuth.js')
const notify = require('./sendNotify')
let MemberID = ['5fb23765e4b03ea8ee0ecfdc', '5f5c575a1170dd0e75b724da']
let tokensArr = [],
  token = ''
Object.keys(bhgTokenNode).forEach((item) => {
  tokensArr.push(bhgTokenNode[item])
})
!(async () => {
  if (!tokensArr[0]) {
    console.log('登录失效!')
    return
  }
  for (let i = 0; i < tokensArr.length; i++) {
    if (tokensArr[i]) {
      token = tokensArr[i]
      memberId = MemberID[i]
      index = i + 1
      isLogin = true
      console.log(`\n开始【华联万柳${index}】${token}\n`)
      if (!isLogin) {
        await notify.sendNotify(`${token}token已失效 - ${token}`, `华联万柳账号${index} ${token}\n请重新登录获取token`)
        continue
      }
      // await signin(token, memberId).then(async (data) => {
      //   await notify.sendNotify(`万柳华联账号${token}`, `${data.resultMsg}`)
      // })
      const data = { mallId: '10000060080241' }
      const options = {
        url: `https://api.bhgmall.com.cn/checkIn/do`,
        body: qs.stringify(data),
        headers: {
          Host: 'api.bhgmall.com.cn',
          Connection: 'keep-alive',
          'Content-Length': 21,
          charset: 'utf-8',
          access_token: token,
          memberid: memberId,
          'content-type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; MI 6 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 MicroMessenger/7.0.20.1781(0x27001438) Process/appbrand0 WeChat/arm32 NetType/WIFI Language/zh_CN ABI/arm32',
          'Accept-Encoding': 'gzip,compress,br,deflate',
          Referer: 'https://servicewechat.com/wx1b1dda695dff82c8/121/page-frame.html'
        }
      }
      const { body } = await got.post(options.url, {
        headers: options.headers,
        body: options.body,
        responseType: 'json'
      })
      console.log(body)
    }
  }
})()
  .catch((e) => {
    console.log('出错了！')
  })
  .finally(() => {
    console.log('完成')
  })
