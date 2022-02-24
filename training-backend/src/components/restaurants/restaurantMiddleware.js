import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';
import { ErrorCodes } from '../../helpers/constants';
import { RESTAURANT_ATTRIBUTES } from './restaurantConstant';

const db = require('../../models');

export async function checkExistRestaurant(req, res, next) {
    try {
        const { id } = req.params;
        const restaurant = await db.Restaurant.findByPk(id, {
            attributes: RESTAURANT_ATTRIBUTES,
            raw: true,
        });
        if (!restaurant) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_PRODUCT_NOT_EXIST, i18n.__('restaurant.check.RestaurantNotExist'), {}));
        }
        req.restaurantData = restaurant;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
