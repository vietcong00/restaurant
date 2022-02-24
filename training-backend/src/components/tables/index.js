import { authenticate } from '../../middleware/auth';
import {
    getList, update, getDetail,
} from './tableController';
import {
    updateValidator, getTableListValidator, paramValidator,
} from './tableValidator';
import { checkExistTable } from './tableMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getTableListValidator, getList);
    router.get('/:id', paramValidator, checkExistTable, getDetail);
    router.patch('/:id', updateValidator, update);

    app.use('/api/table', router);
};
