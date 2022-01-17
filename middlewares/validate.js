const jwt = require('jsonwebtoken');
const { client } = require('../db')

const validate = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const { authorization } = req.headers;
    const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization, process.env.JWT_SECRET): undefined;
    if (payload) {
        const query = {
            text: 'SELECT id FROM users WHERE id=$1',
            values: [payload.id]
        }

        client.query(query).then(user => {
        req.user = user.rows[0];
        next();
      })
    } else {
      res.status(401).json({
        message: 'Not allowed'
      });
    }
  } else {
    res.status(401).json({
      message: 'No Authorization'
    });
  }


}

module.exports = validate;






