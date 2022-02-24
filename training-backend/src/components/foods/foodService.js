import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';
import { FOOD_ATTRIBUTES } from './foodConstant';
import { CATEGORY_ATTRIBUTES } from '../categories/categoryConstant';

const db = require('../../models');

async function getListFood(query) {
    try {
        const wordFilter = query.wordFilter ?? '';
        const whereQuery = [
            {
                and: [{
                    or: [
                        {
                            name: {
                                like: `%${wordFilter}%`,
                            },
                        },
                        {
                            price: {
                                like: `%${wordFilter}%`,
                            },
                        },
                    ],
                },
                ],

            },
        ];
        if (query.idCategory) {
            const idCategory = +query.idCategory;
            whereQuery[0].and.push({ idCategory });
        }
        const result = await db.Food.findAndCountAll({
            offset: query.offset,
            limit: query.limit,
            order: [
                [query.orderBy, query.direction],
            ],
            attributes: FOOD_ATTRIBUTES,
            where: whereQuery,
            include: [{
                model: db.Category,
                as: 'category',
                attributes: CATEGORY_ATTRIBUTES,
            }],
        });
        return { foods: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getFoodListAndTotal ${error.message}`);
        throw error;
    }
}

async function createFood(foodData) {
    try {
        const Category = await db.Category.findOne({
            where: {
                id: foodData.idCategory,
            },
        });
        if (!Category) {
            return respondWithError(ErrorCodes.ERROR_CODE_CATEGORY_NOT_EXIST, i18n.__('food.create.categoryNotExist'), {});
        }
        await db.Food.create(foodData);
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in createFood ${error.message}`);
        throw error;
    }
}

async function updateFood(id, foodData) {
    try {
        const isSuccess = await db.Food.update(foodData, {
            where: { id },
        });
        return isSuccess;
    } catch (error) {
        logger.error(`Error in updateFood ${error.message}`);
        throw error;
    }
}

async function deleteFood(idFood, idUser) {
    try {
        await this.updateFood(idFood, { deletedBy: idUser });
        await db.Food.destroy({ where: { id: idFood } });
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in deleteFood ${error.message}`);
        throw error;
    }
}

module.exports = {
    getListFood,
    createFood,
    updateFood,
    deleteFood,
};
