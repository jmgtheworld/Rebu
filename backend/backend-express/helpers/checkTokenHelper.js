const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
      jwt.verify(token, "bigSecret", (err, decoded) => {
          if (err) {
              res.status(401).json({message: "Access Denied"});
              return;
          } else {
              req.userID = decoded.userID;
              next();
          }
      })
  } else {
      res.status(401).json({message: "Access Denied"})
  }
};

module.exports = {
  checkToken,
}