import SaleService from "../services/sale.service.js";

async function createSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
            throw new Error('value, date, client_id , product_id')
        }
        res.send(await SaleService.createSale(sale));
        logger.info(`POST /sale - ${JSON.stringify(sale)}`);
    } catch (error) {
        next(error)
    }
}

async function getSales(req, res, next) {
    try {
        res.send(await SaleService.getSales(req.query.productId, req.query.supplierId));
        logger.info(`GET /sale`)
    } catch (error) {
        next(error)
    }
}

async function getSale(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        res.send(await SaleService.getSale(id));
        logger.info(`GET /sale`)
    } catch (error) {
        next(error)
    }
}


async function deleteSale(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        await SaleService.deleteSale(id);
        res.end();
        logger.info(`DELETE /sale - ${id}`)
    } catch (error) {
        next(error)
    }
}

async function updateSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.saleId || !sale.value || !sale.date || !sale.clientId) {
            throw new Error('sale_id, value, date, client_id são obrigatórios')
        }
        res.send(await SaleService.updateSale(sale));
        logger.info(`PUT /sale - ${JSON.stringify(sale)}`)
    } catch (error) {
        next(error)
    }
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}