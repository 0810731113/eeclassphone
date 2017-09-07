var fs = require('fs')
var express = require('express')

var cluster = require('cluster')
var http = require('http')
var numCPUs = require("os").cpus().length
var port = parseInt(process.argv[2])

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

var app = module.exports = express()
app.use(express.static(__dirname + '/dist')) ;

var appData = require('./json/logistic-list.json')
var ldd = appData.ldd ;

app.get('/', function(req, res){
  console.log("3001")
  res.sendfile(__dirname + '/dist' + '/index.html')
})

app.get('/logisticlistdata' , function(req, res){

  var jsondata = {
    error: 0 ,
    data: ldd
  }

  res.json(jsondata)

});

app.get('/ldd' , function(req, res){
  console.log(req.query)
  var jsondata = require('./json/'+ req.query.id +'.json')
  //var jsondata = require(sourceurl + req.query.id +'.json')
  res.json({
    error: 0 ,
    data: jsondata
  })
})

app.get('/robot' , function(req, res){
  console.log(req.query)
  var jsondata = require('./json/'+ req.query.id +'.json')
  //var jsondata = require(sourceurl + req.query.id +'.json')
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

if(!module.parent){
  app.listen(3001)
  console.log('Express started on port 3001')
}

// if(cluster.isMaster){
//   for(var i = 0 ; i < numCPUs ; i++){
//     cluster.fork()
//   }
//   cluster.on("exit", function(worker, code, signal) {
//     cluster.fork();
//   });
// }else{
//   app.listen(3000)
// }

// cluster(app)
//   .use(cluster.pidfiles())
//   .use(cluster.debug())
//   .use(cluster.cli())
//   .listen(3000);





























