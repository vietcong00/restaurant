import { authenticate } from '../../middleware/auth';
import {
    getList, getDetail,
} from './restaurantController';
import {
    getRestaurantListValidator, paramValidator,
} from './restaurantValidator';
import { checkExistRestaurant } from './restaurantMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getRestaurantListValidator, getList);
    router.get('/:id', paramValidator, checkExistRestaurant, getDetail);

    app.use('/api/restaurant', router);
};
