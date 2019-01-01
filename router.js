let fs = require('fs');
let path = require('path');
let UtilService = require('./service/UtilService')
let userController = require('./controller/userController')
let indexController = require('./controller/indexController')
module.exports = (dispatcher) => {

  dispatcher.setStatic('/public'); //set path static => localhost:8008/public/a.jpg
  dispatcher.setStaticDirname('public'); //set folder static

  dispatcher.beforeFilter(/\//, (req, res, chain) => { //any url
    //console.log("Before filter");
    chain.next(req, res, chain);
  });

  dispatcher.afterFilter(/\//, (req, res, chain) => { //any url
    //console.log("After filter");
    chain.next(req, res, chain);
  });

  dispatcher.onGet('/', indexController.get)

  dispatcher.onGet('/user', userController.get);
  dispatcher.onGet('/user/:id', userController.get); //=> HttpDispatcher can not get :id from url
  dispatcher.onGet('/user/get', userController.get);

  dispatcher.onPost('/user', userController.update);
  dispatcher.onPut('/user', userController.update);
  dispatcher.onPost('/user/:id', userController.update); //=> HttpDispatcher can not get :id from url

  dispatcher.onError((req, res) => {
    let filePath = '.' + req.url;
    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = UtilService.mimeType;
    let contentType = mimeTypes[extname] || 'application/json';

    fs.readFile(filePath, (error, content) => {
      if(error) {
        if(error.code === 'ENOENT') {
          res.writeHead(404);
          return res.end("404! Page request doesn't exist");
          //fs.readFile('./view/404.html', (error404, content404) => {
          //  if(content404) {
          //    res.writeHead(404, {'Content-Type':contentType});
          //    res.end(content404, 'utf-8');
          //    return
          //  }
          //  res.writeHead(404);
          //  return res.end("The 404 Page doesn't exist");
          //});
        } else {
          res.writeHead(404);
          return res.end("Error, the URL doesn't exist");
        }
      } else {
        res.writeHead(200, {'Content-Type':contentType});
        res.end(content, 'utf-8');
      }
    });
  });



}