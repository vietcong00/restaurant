import { authenticate } from '../../middleware/auth';
import {
    getList,
} from './categoryController';
import {
    getCategoryListValidator,
} from './categoryValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getCategoryListValidator, getList);
    app.use('/api/category', router);
};
