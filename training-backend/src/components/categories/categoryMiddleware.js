import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';
import { ErrorCodes } from '../../helpers/constants';
import { CATEGORY_ATTRIBUTES } from './categoryConstant';

const db = require('../../models');

export async function checkExistCategory(req, res, next) {
    try {
        const { id } = req.params;
        const category = await db.Category.findByPk(id, {
            attributes: CATEGORY_ATTRIBUTES,
            raw: true,
        });
        if (!category) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_PRODUCT_NOT_EXIST, i18n.__('product.check.ProductNotExist'), {}));
        }
        req.categoryData = category;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
