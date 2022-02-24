import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { hashPassword, isValidPassword } from '../auth/authService';
import { ErrorCodes } from '../../helpers/constants';

import { logger } from '../../helpers/logger';

const db = require('../../models');

const userAttributes = ['id', 'email'];

async function getUserList(page = 1, limit = 5) {
    try {
        const pageNumber = +page;
        const limitNumber = +limit;
        const offset = (pageNumber - 1) * limitNumber;

        const result = await db.User.findAndCountAll({
            offset,
            limit: limitNumber,
            attributes: {
                exclude: ['password'],
            },
        });
        return { users: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getUserListAndTotal ${error.message}`);
        throw error;
    }
}

async function createUser(userData) {
    try {
        const user = await db.User.findOne({
            where: {
                email: userData.email,
            },
        });
        if (user) {
            return respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, i18n.__('user.create.emailExist'), {});
        }
        userData.password = await hashPassword(userData.password);
        const result = await db.User.create(userData);
        delete result.dataValues.password;
        return respondSuccess(result);
    } catch (error) {
        logger.error(`Error in createUser ${error.message}`);
        throw error;
    }
}

async function updateUser(id, userData) {
    try {
        const isSuccess = await db.User.update(userData, {
            where: { id },
        });
        return isSuccess;
    } catch (error) {
        logger.error(`Error in updateUser ${error.message}`);
        throw error;
    }
}

async function updatePassword(id, newPassword, oldPassword, currentPassword) {
    try {
        if (!isValidPassword(currentPassword, oldPassword)) {
            return (respondWithError(ErrorCodes.ERROR_CODE_OLD_PASSWORD_NOT_CORRECT, i18n.__('user.updatePassword.oldPasswordIsNotCorrect'), {}));
        }
        await db.User.update({ password: hashPassword(newPassword) }, {
            where: { id },
        });
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in updatePassword ${error.message}`);
        throw error;
    }
}

async function deleteUser(id, idLoginUser) {
    try {
        if (+id === idLoginUser) {
            return respondWithError(ErrorCodes.ERROR_CODE_ITEM_IN_USE, i18n.__('user.delete.accountIsUsing'), {});
        }
        await db.User.destroy({ where: { id } });
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in deleteUser ${error.message}`);
        throw error;
    }
}

// get user detail
export async function getUserDetail(id) {
    try {
        const user = await db.User.findByPk(id, {
            attributes: userAttributes,
            raw: true,
        });
        return user;
    } catch (e) {
        logger.error(`Error in getUserDetail ${e.message}`);
        throw e;
    }
}

module.exports = {
    getUserList,
    createUser,
    updateUser,
    updatePassword,
    deleteUser,
};
