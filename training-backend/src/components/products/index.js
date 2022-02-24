import { authenticate } from '../../middleware/auth';
import {
    getList, create, update, getDetail, deleteProduct,
} from './productController';
import {
    createValidator, updateValidator, getProductListValidator, paramValidator,
} from './productValidator';
import { checkExistProduct } from './productMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate(), getProductListValidator, getList);
    router.post('/', authenticate(), createValidator, create);
    router.get('/:id', authenticate(), paramValidator, checkExistProduct, getDetail);
    router.patch('/:id', authenticate(), paramValidator, checkExistProduct, updateValidator, update);
    router.delete('/:id', authenticate(), paramValidator, checkExistProduct, deleteProduct);

    app.use('/api/product', router);
};
