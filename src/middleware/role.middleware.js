const adminValidate = (req, res, next) => {
    const role = req.user.rol

    if( role === 'admin'){
        return next()
    }else{
        return res.status(401).json({ message: 'Access Denied!'})
    }

}

module.exports = adminValidate