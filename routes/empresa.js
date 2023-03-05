//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa, getMySucursales } = require('../controllers/empresa');
const { emailExiste, esRoleValido, existeEmpresaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar',[
    check('nombre', 'El nombre es olbigatorio').not().isEmpty(),
    check('correo', 'El email es obligatorio').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    check('rol').custom( esRoleValido ),
    validarCampos
], postEmpresa);

router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    //check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarCampos
], putEmpresa);

router.delete('/eliminar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    validarCampos
], deleteEmpresa);


module.exports = router;