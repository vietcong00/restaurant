import {
    respondWithError,
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import userService from './userService';

const db = require('../../models');

export async function getList(req, res) {
    try {
        const { page, limit } = req.query;
        const result = await userService.getUserList(page, limit);
        return res.json(
            respondSuccess({ items: result.users, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'userController - getList');
    }
}
export async function create(req, res) {
    try {
        const result = await userService.createUser(req.body);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'userController - create');
    }
}
export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.userData));
    } catch (error) {
        return logSystemError(res, error, 'userController - getDetail');
    }
}
export async function update(req, res) {
    try {
        const result = await userService.updateUser(req.params?.id, req.body);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'userController - update');
    }
}

export async function updatePassword(req, res) {
    try {
        const id = req.params?.id;
        const { newPassword, oldPassword } = req.body;
        const user = req.userData;
        const result = await userService.updatePassword(id, newPassword, oldPassword, user.password);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'userController - updatePassword');
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params?.id;
        const idLoginUser = req.loginUser.id;
        const result = await userService.deleteUser(id, idLoginUser);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'userController - deleteUser');
    }
}
