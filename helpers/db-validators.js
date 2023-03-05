const Empresa = require("../models/empresa");
const Role = require("../models/role");

const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeEmpresa = await Empresa.findOne( { correo } );
    if ( existeEmailDeEmpresa) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}

const existeEmpresaPorId = async(id) => {
    const existIdOfCompany = await Empresa.findById( id );
    if ( !existIdOfCompany) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }
}

module.exports = {
    emailExiste,
    esRoleValido,
    existeEmpresaPorId
}