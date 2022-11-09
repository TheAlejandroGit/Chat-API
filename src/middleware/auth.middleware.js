//? Middleware para proteger rutas

const { jwtSecret } = require("../config");
const { getUserById } = require("../users/users.controllers");

//Revisar si existe un token

// Verificar si el token pertenece a un usuario valido

// Modificar el req y agregar req.user con la informacion desencriptada del token

//? estrategia: Diferentes maneras de hacer un login
const JwtStrategy = require("passport-jwt").Strategy;
//? passport maneja estrategias para las diferentes estrategias

const ExtractJwt = require("passport-jwt").ExtractJwt;
//? Estrae la autenticacion y los headers de la peticion

//? funcion anonima 
module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: jwtSecret
  };

  passport.use(
    new JwtStrategy(options, async (decoded, done) => {
        //? done(error, decoded)
      try {
        const response = await getUserById(decoded.id);
        if (!response) {
          return done(null, false);
        }
        console.log("decoded", decoded);
        return done(null, decoded);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
