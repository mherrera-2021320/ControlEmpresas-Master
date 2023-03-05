const {Router} = require('express');
const { getSucursales, postSucursal, putSucursal, deleteSucursal, asignarEmpresa } = require('../controllers/sucursal');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar',[
    validarJWT
], getSucursales);

router.post('/agregar', [
    validarJWT
], postSucursal);

router.put('/editar/:id', [
    validarJWT
], putSucursal);

router.delete('/eliminar/:id', [
    validarJWT
], deleteSucursal);

router.get('/asignar/:idSucursal', [
    validarJWT
], asignarEmpresa);

module.exports = router;