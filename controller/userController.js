let userController = {}
userController.get = (req, res) => {
  let customer = {
    firstName:'Tony',
    lastName:'Stark',
    param: req.params,
    method: req.method
  }
  res.writeHead(200, {'Content-Type':'application/json'})
  res.end(JSON.stringify(customer))
};

userController.update = (req, res) => {
  let response = {
    status: 'success',
    param: req.params,
    method: req.method
  }
  res.writeHead(201, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(response))
};


module.exports = userController;