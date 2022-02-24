import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';

import { ErrorCodes } from '../../helpers/constants';

const db = require('../../models');

export async function checkExistUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await db.User.findByPk(id);
        if (!user) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_USER_NOT_EXIST, i18n.__('user.middleware.accountIsUsing'), {}));
        }
        req.userData = user;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
