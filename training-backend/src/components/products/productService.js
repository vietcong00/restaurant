import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';

const db = require('../../models');

const productAttributes = ['id', 'name', 'descriptions'];
const categoryAttributes = ['id', 'name'];

async function getListProduct(query) {
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
                            descriptions: {
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
        const result = await db.Product.findAndCountAll({
            offset: query.offset,
            limit: query.limit,
            order: [
                [query.orderBy, query.direction],
            ],
            attributes: productAttributes,
            where: whereQuery,
            include: [{
                model: db.Category,
                as: 'category',
                attributes: categoryAttributes,
            }],
        });
        return { products: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getProductListAndTotal ${error.message}`);
        throw error;
    }
}

async function createProduct(productData) {
    try {
        const Category = await db.Category.findOne({
            where: {
                id: productData.idCategory,
            },
        });
        if (!Category) {
            return respondWithError(ErrorCodes.ERROR_CODE_CATEGORY_NOT_EXIST, i18n.__('product.create.categoryNotExist'), {});
        }
        await db.Product.create(productData);
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in createProduct ${error.message}`);
        throw error;
    }
}

async function updateProduct(id, productData) {
    try {
        const isSuccess = await db.Product.update(productData, {
            where: { id },
        });
        return isSuccess;
    } catch (error) {
        logger.error(`Error in updateProduct ${error.message}`);
        throw error;
    }
}

async function deleteProduct(idProduct, idUser) {
    try {
        await this.updateProduct(idProduct, { deletedBy: idUser });
        await db.Product.destroy({ where: { id: idProduct } });
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in deleteProduct ${error.message}`);
        throw error;
    }
}

module.exports = {
    getListProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
