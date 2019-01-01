let fs = require('fs')
let cotroller = {}

cotroller.get = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  fs.readFile('./view/index.html', 'utf8', function(err, contents) {
    if(err){
      console.log(`ERROR`, err)
      res.writeHead(500, {'Content-Type': 'application/json'})
      res.end(err)
      return;
    }
    res.end(contents)
  });
};


module.exports = cotroller;