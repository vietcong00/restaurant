import { authenticate } from '../../middleware/auth';
import {
    getList, create, update, deleteUser, getDetail, updatePassword,
} from './userController';
import {
    createValidator, updateValidator, updatePasswordValidator, getUserListValidator,
} from './userValidator';
import { checkExistUser } from './userMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate(), getUserListValidator, getList);
    router.post('/', authenticate(), createValidator, create);
    router.get('/:id', authenticate(), checkExistUser, getDetail);
    router.patch('/:id', authenticate(), checkExistUser, updateValidator, update);
    router.patch('/:id/password', authenticate(), checkExistUser, updatePassword);
    router.delete('/:id', authenticate(), checkExistUser, deleteUser);

    app.use('/api/user', router);
};
