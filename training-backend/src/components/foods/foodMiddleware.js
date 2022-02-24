import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';
import { ErrorCodes } from '../../helpers/constants';
import { FOOD_ATTRIBUTES } from './foodConstant';

const db = require('../../models');

export async function checkExistFood(req, res, next) {
    try {
        const { id } = req.params;
        const food = await db.Food.findByPk(id, {
            attributes: FOOD_ATTRIBUTES,
            raw: true,
        });
        if (!food) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_PRODUCT_NOT_EXIST, i18n.__('food.check.FoodNotExist'), {}));
        }
        req.foodData = food;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
