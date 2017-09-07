var proxyServer = require('http-proxy');
var port = parseInt(process.argv[2]);
// var servers = [
//   {
//     host: "127.0.0.1",
//     port: 3000
//   },
//   {
//     host: "127.0.0.1",
//     port: 3001
//   }
// ];
var servers = [
  'localhost:3000',
  'localhost:3001'
];

proxyServer.createServer(function (req, res, proxy) {
  var target = servers.shift();

  proxy.proxyRequest(req, res, target);
  servers.push(target);
}).listen(5000);

// var http = require('http'),
//   httpProxy = require('http-proxy');
//
// //
// // Create a proxy server with custom application logic
// //
// var proxy = httpProxy.createProxyServer({});
//
// //
// // Create your custom server and just call `proxy.web()` to proxy
// // a web request to the target passed in the options
// // also you can use `proxy.ws()` to proxy a websockets request
// //
// var server = http.createServer(function(req, res) {
//   // You can define here your custom logic to handle the request
//   // and then proxy the request.
//   proxy.web(req, res, { target: 'http://127.0.0.1:3000'});
//   // proxy.web(req, res, { target: 'http://127.0.0.1:3001'});
// });
//
// console.log("listening on port 5050")
// server.listen(5050);


