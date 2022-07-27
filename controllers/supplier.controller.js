import SupplierService from "../services/supplier.service.js";

async function createSupplier(req, res, next) {
    try {
        let supplier = req.body;
        if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
            throw new Error('Name, CNPJ, Phone , Email e Adress são obrigatórios')
        }
        res.send(await SupplierService.createSupplier(supplier));
        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`)
    } catch (error) {
        next(error)
    }
}

async function getSuppliers(req, res, next) {
    try {
        res.send(await SupplierService.getSuppliers());
        logger.info(`GET /supplier`)
    } catch (error) {
        next(error)
    }
}

async function getSupplier(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        res.send(await SupplierService.getSupplier(id));
        logger.info(`GET /supplier`)
    } catch (error) {
        next(error)
    }
}


async function deleteSupplier(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        await SupplierService.deleteSupplier(id);
        res.end();
        logger.info(`DELETE /supplier - ${id}`)
    } catch (error) {
        next(error)
    }
}

async function updateSupplier(req, res, next) {
    try {
        let supplier = req.body;
        if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address || !supplier.supplierId) {
            throw new Error('Name, CNPJ, Phone , Email e Address e id são obrigatórios')
        }
        res.send(await SupplierService.updateSupplier(supplier));
        logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`)
    } catch (error) {
        next(error)
    }
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}