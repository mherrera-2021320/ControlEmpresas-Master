const {Schema, model} = require('mongoose');

const SucursalSchema = new Schema({
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio']
    },
    direccion: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    empresa: {
        type: Array
    }
});

module.exports = model('Sucursal', SucursalSchema);