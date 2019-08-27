const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  
  // ** add all this code

  const token = req.headers.authorization;

  // the front end application would add the token that it has received previously
  // to the headers as an Authorization header
  // so the server can grab it and verify it

  // in Insomnia, add an Authorization header manually with the token
  // to verify if it works:

  // Authorization :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoidXNlciIsInVzZXJuYW1lIjoiQ2VzYXJlIiwiaWF0IjoxNTY2ODczODEzLCJleHAiOjE1NjY4Nzc0MTN9.C0spo8yoc-eocSgxMFyfi2pKsPxPd9GqlpL_JyHMmuU

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // bad token
        res.status(401).json({message: "There was a problem"});
      } else { // decodedtoken
        req.decodedJwt = decodedToken; // so other middleware can use it
        next();
      }
    })
  } else {
    res.status(401).json({message: "There was a problem, no token"});
  }


//  We don't need this anymore

//   const { username, password } = req.headers;
// 
//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Ran into an unexpected error' });
//       });
//   } else {
//     res.status(400).json({ message: 'No credentials provided' });
//   }
// 

};
