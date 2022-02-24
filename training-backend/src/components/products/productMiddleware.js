import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';
import { ErrorCodes } from '../../helpers/constants';

const productAttributes = ['name', 'descriptions', 'idCategory'];

const db = require('../../models');

export async function checkExistProduct(req, res, next) {
    try {
        const { id } = req.params;
        const product = await db.Product.findByPk(id, {
            attributes: productAttributes,
            raw: true,
        });
        if (!product) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_PRODUCT_NOT_EXIST, i18n.__('product.check.ProductNotExist'), {}));
        }
        req.productData = product;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
