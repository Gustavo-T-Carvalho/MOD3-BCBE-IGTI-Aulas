import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error('Name, CPF, Phone , Email e Adress são obrigatórios')
        }
        res.send(await ClientService.createClient(client));
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (error) {
        next(error)
    }
}

async function getClients(req, res, next) {
    try {
        res.send(await ClientService.getClients());
        logger.info(`GET /client`)
    } catch (error) {
        next(error)
    }
}

async function getClient(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        res.send(await ClientService.getClient(id));
        logger.info(`GET /client`)
    } catch (error) {
        next(error)
    }
}


async function deleteClient(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        await ClientService.deleteClient(id);
        res.end();
        logger.info(`DELETE /client - ${id}`)
    } catch (error) {
        next(error)
    }
}

async function updateClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address || !client.clientId) {
            throw new Error('Name, CPF, Phone , Email e Address e id são obrigatórios')
        }
        res.send(await ClientService.updateClient(client));
        logger.info(`PUT /client - ${JSON.stringify(client)}`)
    } catch (error) {
        next(error)
    }
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}