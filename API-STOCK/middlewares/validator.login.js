function validatorLogin(req, res, next) {
      const token = req.headers['access-token'];
          
      if (token) {
          jwt.verify(token, req.app.get('key'), (err, decoded) => {      
           if (err) {
            return res.status(500).json({message: 'Invalid token'})
           } else {
             req.decoded = decoded; 
             next();
             }
         });
        }
        else {
          return res.status(500).json({message: 'null token'})
        }
      }

module.exports = validatorLogin;