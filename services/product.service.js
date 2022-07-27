import ProductRepository from '../repositories/product.repository.js'
import SupplierRepository from '../repositories/supplier.repository.js'
import SaleRepository from '../repositories/sale.repository.js'
import productInfoRepository from '../repositories/productInfo.repository.js';

async function createProduct(product) {
    if(await SupplierRepository.getSupplier(product.supplierId)){
        return await ProductRepository.insertProduct(product);
    }
    throw new Error("O Supplier_id informado não existe")
}

async function getProducts() {
    return await ProductRepository.getProducts();
}

async function getProduct(id) {
    const product = await ProductRepository.getProduct(id);
    product.info = await productInfoRepository.getProductInfo(parseInt(id));
    console.log(product);
    return product; 
}

async function deleteProduct(id) {
    const sales = await SaleRepository.getSalesByProductId(id);
    console.log(sales);
    if(sales.length){
        throw new Error("Não é possível excluir um produto pois ele tem vendas.")
    }
    await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if(await SupplierRepository.getSupplier(product.supplierId)){
        return await ProductRepository.updateProduct(product);
    }
    throw new Error("O Supplier_id informado não existe")
}

async function createProductInfo(productInfo) {
    await productInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {
    await productInfoRepository.updateProductInfo(productInfo);
}


export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo
}