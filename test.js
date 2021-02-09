const qs = require('qs')
const Env = require('./Env.min')

console.log('hahahah')
const $ = new Env('金融打卡领年终奖')
console.log(2)
const notify = $.isNode() ? require('./sendNotify') : ''
//Node.js用户请在jdCookie.js处填写京东ck;
const bhgTokenNode = $.isNode() ? require('./bhgAuth.js') : ''
let MemberID = ['5fb23765e4b03ea8ee0ecfdc', '5f5c575a1170dd0e75b724da']
//IOS等用户直接用NobyDa的jd cookie
let tokensArr = [],
  token = ''
if ($.isNode()) {
  Object.keys(bhgTokenNode).forEach((item) => {
    tokensArr.push(bhgTokenNode[item])
  })
} else {
  tokensArr.push($.getdata('CookieJD'))
  tokensArr.push($.getdata('CookieJD2'))
}
!(async () => {
  if (!tokensArr[0]) {
    $.msg($.name, '【提示】请先获取华联万柳登录 Token\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', { 'open-url': 'https://bean.m.jd.com/' })
    return
  }
  for (let i = 0; i < tokensArr.length; i++) {
    if (tokensArr[i]) {
      token = tokensArr[i]
      memberId = MemberID[i]
      $.index = i + 1
      $.isLogin = true
      console.log(`\n开始【华联万柳${$.index}】${token}\n`)
      if (!$.isLogin) {
        $.msg($.name, `【提示】token 已失效`, `华联万柳账号${$.index} ${token}\n请重新登录获取\nhttps://bean.m.jd.com/`, { 'open-url': 'https://bean.m.jd.com/' })

        if ($.isNode()) {
          await notify.sendNotify(`${token}token已失效 - ${token}`, `华联万柳账号${$.index} ${token}\n请重新登录获取token`)
        } else {
          $.setdata('', `tokensArr${i ? i + 1 : ''}`) //cookie失效，故清空cookie。$.setdata('', `CookieJD${i ? i + 1 : "" }`);//cookie失效，故清空cookie。
        }
        continue
      }
      await signin(token, memberId).then(async (data) => {
        await notify.sendNotify(`万柳华联账号${token}`, `${data.resultMsg}`)
      })
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done()
  })

async function signin(access_token, member_id) {
  return new Promise(async (resolve) => {
    const data = { mallId: '10000060080241' }
    const options = {
      url: `https://api.bhgmall.com.cn/checkIn/do`,
      body: qs.stringify(data),
      headers: {
        Host: 'api.bhgmall.com.cn',
        Connection: 'keep-alive',
        'Content-Length': 21,
        charset: 'utf-8',
        access_token: access_token,
        memberid: member_id,
        'content-type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; MI 6 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 MicroMessenger/7.0.20.1781(0x27001438) Process/appbrand0 WeChat/arm32 NetType/WIFI Language/zh_CN ABI/arm32',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        Referer: 'https://servicewechat.com/wx1b1dda695dff82c8/121/page-frame.html'
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data)
            console.log(data)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}
