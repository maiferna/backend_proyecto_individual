
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const header = req.header('Authorization');
    console.log(header);
    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No tiene autorización."
        })
    }
    try {
        const secret_key = process.env.JWT_SECRET_KEY;
        const payload = jwt.verify(token, secret_key);
        req.uid = payload.uid;
        req.role = payload.role;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "El token no es válido."
        })
    }
}


module.exports = {
    verifyToken
}
