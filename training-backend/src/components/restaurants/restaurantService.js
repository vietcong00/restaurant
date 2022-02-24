import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';
import { RESTAURANT_ATTRIBUTES } from './restaurantConstant';

const db = require('../../models');

async function getListRestaurant(query) {
    try {
        const result = await db.Restaurant.findAndCountAll({
            offset: query.offset,
            limit: query.limit,
            order: [
                [query.orderBy, query.direction],
            ],
            attributes: RESTAURANT_ATTRIBUTES,
        });
        return { restaurants: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getRestaurantListAndTotal ${error.message}`);
        throw error;
    }
}

module.exports = {
    getListRestaurant,
};
