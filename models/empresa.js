const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({ 
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true
    },
    sucursales: {
        type: Array
    }
});

module.exports = model('Empresa', EmpresaSchema)