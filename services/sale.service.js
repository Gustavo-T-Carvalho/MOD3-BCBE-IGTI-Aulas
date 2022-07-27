import SaleRepository from '../repositories/sale.repository.js'
import ClientRepository from '../repositories/client.repository.js'
import ProductRepository from '../repositories/product.repository.js'
import saleRepository from '../repositories/sale.repository.js';
async function createSale(sale) {
    const errors = [];
    if (!await ClientRepository.getClient(sale.clientId)) {
        errors.push("O client_id informado não existe.")
    }
    const product = await ProductRepository.getProduct(sale.productId);
    if (!product) {
        errors.push("O product_id informado não existe.")
    }
    if (errors.length) {
        // throw new Error(errors);
        throw errors;
    }
    if (product.stock > 0) {
        const saleResult = await SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return saleResult;
    } else {
        throw new Error("O produto informado não possui estoque.");
    }

}

async function getSales(productId, supplierId) {
    if (productId) {
        return await saleRepository.getSalesByProductId(productId);
    }

    if(supplierId) {
        return await saleRepository.getSalesBySupplierId(supplierId);
    }
    return await SaleRepository.getSales();

}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id);
    if (sale) {
        const product = await ProductRepository.getProduct(sale.productId);
        await SaleRepository.deleteSale(id);
        product.stock++;
        await ProductRepository.updateProduct(product);
    } else {
        throw new Error("O id da sale informado não existe")
    }
}

async function updateSale(sale) {
    const errors = [];
    if (!await ClientRepository.getClient(sale.clientId)) {
        errors.push("O client_id informado não existe.")
    }
    // if (!await ProductRepository.getProduct(sale.productId)) {
    //     errors.push("O product_id informado não existe.")
    // }
    if (errors.length) {
        // throw new Error(errors);
        throw errors;
    }
    return await SaleRepository.updateSale(sale);
}


export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}