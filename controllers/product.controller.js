import ProductService from "../services/product.service.js";

async function createProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error('Name, description, value , stock e supplier_id são obrigatórios')
        }
        res.send(await ProductService.createProduct(product));
        logger.info(`POST /product - ${JSON.stringify(product)}`)
    } catch (error) {
        next(error)
    }
}

async function getProducts(req, res, next) {
    try {
        res.send(await ProductService.getProducts());
        logger.info(`GET /product`)
    } catch (error) {
        next(error)
    }
}

async function getProduct(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        res.send(await ProductService.getProduct(id));
        logger.info(`GET /product`)
    } catch (error) {
        next(error)
    }
}


async function deleteProduct(req, res, next) {
    try {
        let id = req.params.id;
        if (!id) {
            throw new Error('O id é obrigatório');
        }
        await ProductService.deleteProduct(id);
        res.end();
        logger.info(`DELETE /product - ${id}`)
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId || !product.productId) {
            throw new Error('Name, description, value , stock e supplier_id e product_id são obrigatórios')
        }
        res.send(await ProductService.updateProduct(product));
        logger.info(`PUT /product - ${JSON.stringify(product)}`)
    } catch (error) {
        next(error)
    }
}

async function createProductInfo(req, res,next) {
    try {
        let productInfo = req.body;
        if(!productInfo.productId) {
            throw new Error("ProductId é obrigatório" )
        }
        productInfo = await ProductService.createProductInfo(productInfo);
        res.end();
        logger.info(`POST /product/info - ${JSON.stringify(productInfo)}`)
    } catch (err) {
        next(err)
    }
}

async function updateProductInfo(req, res,next) {
    try {
        let productInfo = req.body;
        if(!productInfo.productId) {
            throw new Error("ProductId é obrigatório" )
        }
        productInfo = await ProductService.updateProductInfo(productInfo);
        res.end();
        logger.info(`PUT /product/info - ${JSON.stringify(productInfo)}`)
    } catch (err) {
        next(err)
    }
}


export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
}