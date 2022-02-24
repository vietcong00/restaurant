import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';
import { CATEGORY_ATTRIBUTES } from './categoryConstant';

const db = require('../../models');

async function getCategoryList(query) {
    try {
        const result = await db.Category.findAndCountAll({
            offset: query.offset,
            limit: query.limit,
            order: [
                [query.orderBy, query.direction],
            ],
            attributes: CATEGORY_ATTRIBUTES,
        });
        return { categories: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getCategoriesListAndTotal ${error.message}`);
        throw error;
    }
}

module.exports = {
    getCategoryList,
};
