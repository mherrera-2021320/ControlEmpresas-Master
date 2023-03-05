const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Empresa = require('../models/empresa');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    //Validar si el token se envia en los headers
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        //leer al usuario que corresponda el uid
        const empresa = await Empresa.findById( uid );

        //Verificar el uid del usuario, si no existiera
        if ( !empresa ) {
            return res.status(401).json({
                msg: 'Token no válido - Empresa no existe en la base de datos'
            });
        }

        req.empresa = empresa;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}