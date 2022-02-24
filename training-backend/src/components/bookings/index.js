import { authenticate } from '../../middleware/auth';
import {
    create, getList, update, getDetail,
} from './bookingController';
import {
    createValidator, updateValidator, getBookingListValidator, paramValidator,
} from './bookingValidator';
import { checkExistBooking } from './bookingMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getBookingListValidator, getList);
    router.post('/', createValidator, create);
    router.get('/:id', paramValidator, checkExistBooking, getDetail);
    router.patch('/:id', updateValidator, update);

    app.use('/api/booking', router);
};
