const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'POST, PUT, GET, DELETE, OPTIONS');
    res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    return next();
  }
  
  module.exports = cors;