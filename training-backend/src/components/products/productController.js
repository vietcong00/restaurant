import {
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import productService from './productService';

export async function getList(req, res) {
    try {
        const { query } = req;
        const pageNumber = +query.page;
        const limit = +query.limit;
        const offset = (pageNumber - 1) * limit;

        const result = await productService.getListProduct({
            offset,
            limit,
            orderBy: query.orderBy,
            direction: query.direction,
            wordFilter: query.wordFilter,
            idCategory: query.idCategory,
        });
        return res.json(
            respondSuccess({ items: result.products, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'productController - getList');
    }
}
export async function create(req, res) {
    try {
        const product = req.body;
        product.createdBy = req.loginUser.id;
        const result = await productService.createProduct(product);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'productController - create');
    }
}
export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.productData));
    } catch (error) {
        return logSystemError(res, error, 'productController - getDetail');
    }
}
export async function update(req, res) {
    try {
        const product = req.body;
        product.updatedBy = req.loginUser.id;
        const result = await productService.updateProduct(req.params?.id, product);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'productController - update');
    }
}

export async function deleteProduct(req, res) {
    try {
        const idUser = req.loginUser.id;
        const idProduct = req.params?.id;
        await productService.updateProduct(idProduct, { deletedBy: idUser });
        const result = await productService.deleteProduct(idProduct, idUser);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'userController - deleteUser');
    }
}
