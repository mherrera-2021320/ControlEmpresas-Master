const { response, request } = require('express');
const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');

const getSucursales = async (req = request, res = response) => {
    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(),
        Sucursal.find()
    ])

    res.json({
        msg: 'Sucursales',
        listaSucursales
    })
}

const postSucursal = async (req = request, res = response) => {
    const municipio = req.body.municipio;
    const direccion = req.body.direccion;
    const usuario = req.empresa._id

    const sucursalDB = new Sucursal({ municipio, direccion, usuario });
    await sucursalDB.save();

    res.status(201).json({
        msg: 'Sucursal Creada',
        sucursalDB
    })
}

const putSucursal = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'Sucursal Editada',
        sucursalEditada
    })
}

const deleteSucursal = async (req = request, res = response) => {
    const { id } = req.params;
    const existeSucursal = await Sucursal.findOne({ _id: id });
    const empresas = existeSucursal.empresa;
    const user = existeSucursal.usuario;

    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);

    for (let empresa of empresas) {
        await Empresa.findOneAndUpdate(
            { _id: empresa },
            { $pull: { 'sucursales': id } },
        );
    }
    await Empresa.findOneAndUpdate(
        { _id: user },
        { $pull: { 'sucursales': id } },
    )
    res.status(200).json({
        msg: 'Sucursal eliminado',
        sucursalEliminada
    })    
}

const asignarEmpresa = async (req = request, res = response) => {
    const { idSucursal } = req.params;
    const empresa = req.empresa._id;
    const sucursales = req.empresa.sucursales;
    const existeSucursal = await Sucursal.findOne({ _id: idSucursal });
    if (!existeSucursal) {
        return res.status(404).json({
            msg: 'Sucursal no encontrada'
        })
    }

    for (let sucursal of sucursales) {
        if (existeSucursal._id != sucursal) continue
        var existe = sucursal
    }
    if (existe) return res.status(400).json({ msg: 'Ya tienes esta sucursal' })
    const updatedCompany = await Empresa.findOneAndUpdate(
        { _id: empresa },
        { $push: { 'sucursales': idSucursal } },
        { new: true }
    );
    const updatedBranch = await Sucursal.findOneAndUpdate(
        { _id: idSucursal },
        { $push: { 'empresa': empresa } },
        { new: true }
    )
    res.status(200).json({
        msg: 'Empresa Asignada',
        updatedCompany,
        updatedBranch
    })
}

module.exports = {
    getSucursales,
    postSucursal,
    putSucursal,
    deleteSucursal,
    asignarEmpresa
}