const Auth = require('../schemas/auth.schema');
const bcrypt = require('bcrypt');

class AuthService {

  constructor(){ }

  async auth(req, res) {

   Auth.findOne({ email: req.body.email }, (err, retAuth)=>{//busca el usuario por email,
                                                //si lo encuentra o no lo almacena en retAuth
      if (err) {
        return res.status(500).json({message: 'Error', err: err})
     }
   
   if (!retAuth) {//si el usuario no esta registrado
       return res.status(400).json({message: "Usuario inexistente"})
    } else {
       if (!bcrypt.compareSync(req.body.password, retAuth.password)){//si la contraseña no coincide
       return res.status(400).json({message: "Usuario o contraseña incorrectos"});
      }
      else {
         const payload = { check:  true};
         const token = jwt.sign(payload, req.app.get('key'), { expiresIn: 1440 });//tener en cuenta el tiempo de expiracion
         res.json({ id: retAuth._id, message: 'Successfull authentication', token: token}); 
      }
    }
 
 })
  
  } 

 async register (req, res) {

  let auth = new Auth({username: req.body.username, email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)});
    console.log(auth);
    auth.save((err, retAuth) => {
    if (err) {
      return res.status(400).json({
         message: "error",
         text: err,
      });
    }
    res.json({
          message: "usuario creado",
          usuario: retAuth
       });
    })
 } 

}

module.exports = AuthService;
