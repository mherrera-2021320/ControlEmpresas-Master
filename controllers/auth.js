const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const Empresa = require('../models/empresa');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {
    const {correo, password} = req.body;

    try {
        const empresa = await Empresa.findOne({correo});

        if (!empresa){
            return res.status(404).json({
                msg: 'El correo no existe en la DB'
            });
        }

        const validarPassword = bcryptjs.compareSync( password, empresa.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'La password es incorrecta'
            });
        }

        const token = await generarJWT(empresa.id);

        res.status(200).json({
            msg: 'Login Auth Exitoso',
            correo, password,
            token
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}