require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var appData = require('../json/logistic-list.json')
var ldd = appData.ldd ;

//var apiRoutes = express.Router()
app.get('/logisticlistdata' , function(req, res){
  res.json({
    error: 0 ,
    data: ldd
  })
});

app.get('/ldd' , function(req, res){
  console.log(req.query)
  var jsondata = require('../json/'+ req.query.id +'.json')
  res.json({
    error: 0 ,
    data: jsondata
  })
})

app.get('/robot' , function(req, res){
  console.log(req.query)
  var jsondata = require('../json/'+ req.query.id +'.json')
  res.json({
    error: 0 ,
    data: jsondata
  })
})

const emailInfo = {
  service: '163' ,
  user: 'LHH999138@163.com' ,
  pass:'LH000936'
}

var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: emailInfo.service ,
  auth: {
    user: emailInfo.user ,
    pass: emailInfo.pass
  }
})) ;

function sendMail(recipient , subject , html){

  var promise = new Promise(function(resolve, reject){
    smtpTransport.sendMail({
      from: emailInfo.user ,
      to: recipient ,
      subject: subject ,
      html: html

    },function(error , response){
      if(error){
        reject(error)
      }else{
        resolve(response)
      }
    })
  })
  return promise ;

}

app.get('/sendemail' , function(req , res){
  console.log(req.query)
  var reqCon = req.query
  var mailTitle = "访客咨询"
  var mailContent = ""

  if(reqCon.username){
    mailContent += "我是: " + reqCon.username ;
  }
  if(reqCon.telphone){
    mailContent += " 我的电话是:  " + reqCon.telphone ;
  }
  if(reqCon.email){
    mailContent += " 我的邮箱是:  " + reqCon.email ;
  }
  if(reqCon.question){
    mailContent += " 我想咨询: " + reqCon.question ;
  }
  sendMail('895842425@qq.com', mailTitle , mailContent ).then(function(response){
   console.log('response: ' +response[0])
    res.json({
      error: 0 ,
      status: 'success'
    })
  }).catch(function(error){
    console.log('sendmail-error!')
    throw error ;
    res.json({
      error: 1 ,
      status: 'fail'
    })
  })

})

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
