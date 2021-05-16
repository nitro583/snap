
// firebase Functions読み込み
const functions = require('firebase-functions')
// nuxt読み込み
const { Nuxt } = require('nuxt')
// nuxtインスタンス作成
const nuxt = new Nuxt({
  buildDir: 'ssr',
  dev: false,
})

exports.ssr = functions.https.onRequest(async (req, res) => {
  await nuxt.ready()
  return nuxt.render(req, res)
})