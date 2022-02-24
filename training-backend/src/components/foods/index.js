import { authenticate } from '../../middleware/auth';
import {
    getList, create, update, getDetail, deleteFood,
} from './foodController';
import {
    createValidator, updateValidator, getFoodListValidator, paramValidator,
} from './foodValidator';
import { checkExistFood } from './foodMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getFoodListValidator, getList);
    router.post('/', authenticate(), createValidator, create);
    router.get('/:id', authenticate(), paramValidator, checkExistFood, getDetail);
    router.patch('/:id', authenticate(), paramValidator, checkExistFood, updateValidator, update);
    router.delete('/:id', authenticate(), paramValidator, checkExistFood, deleteFood);

    app.use('/api/food', router);
};
