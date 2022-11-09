//? Dependencies
const bcrypt = require('bcrypt')


//?Encriptando Contraseña
const hashPassword = (plainPassword) =>{
    const hashedPassword = bcrypt.hashSync(plainPassword, 10)
    return hashedPassword
}

//?Comparando la contraseña en texto plano y la encriptada
const comparePassword = (plainPassword, hashedPassword) =>{
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}
