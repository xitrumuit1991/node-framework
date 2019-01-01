let http = require("http");

//HttpDispatcher can not user for this case: /user/:id
let HttpDispatcher = require('httpdispatcher')
let dispatcher = new HttpDispatcher()

//other router
let Router = require('router')//https://github.com/pillarjs/router

let server = http.createServer((req, res)=>{
  res.setHeader("Content-Type", "application/json"); //set
  res.setHeader("X-Powered-By", "Custom Node framework"); //set
  try {
    console.log(req.url);
    dispatcher.dispatch(req, res);
  } catch(err) {
    console.log(err);
  }
});

//router
require('./router')(dispatcher);

server.listen(process.env.PORT || 8008, () => {
  console.log(`Server listening at ${process.env.PORT || 8008}`);
});