const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers["token"]; // Ensure the header key matches the client-side
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        return res.status(401).json({ mensaje: "Token inválido" }); // Use 401 for unauthorized
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(400).json({ mensaje: "Verificación de token errónea, debes enviar un token" });
  }
};

const getUserDataFromToken = (req,res) => {
  const token = req.headers["token"];
  const secret = process.env.JWT_SECRET;
  try {
    const data = jwt.verify(token, secret);
    return res.status(200).json({data});
  } catch (error) {
    res.status(400).json({ mensaje: "Token invalido AQUI" });
  }
};

const validateAndReturnUserData = (req,res) => {
  const token = req.headers["token"];
  const secret = process.env.JWT_SECRET;
  try {
    const data = jwt.verify(token, secret);
    return res.status(200).json({data : data, isValid: true});
  } catch (error) {
    return res.status(400).json({ mensaje: "Token invalido", isValid: false });
  }
};

const verifyTokenAdmin = (req,res,next) => {
  const token = req.headers["token"];
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret
    , (error, data) => {
      if (error) return res.status(400).json({ mensaje: "Token invalido" });
      else {
        req.user = data;
        if(req.user.rol !== "administrador"){
          return res.status(400).json({ mensaje: "No tienes permisos para realizar esta acción" });
        }
        next();
      }
    });
  } else {
    res.status(400).json({ mensaje: "Debes enviar un token" });
  }
}

module.exports = { verifyToken, getUserDataFromToken, verifyTokenAdmin , validateAndReturnUserData};