import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

// -----------------validate param id product-----------------
const paramValidSchema = Joi.object().keys({
    id: Joi.number().integer().min(1).required(),
});

export async function paramValidator(req, res, next) {
    const { params } = req;
    const result = Joi.validate(params, paramValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

// -----------------validate get list category-----------------
const getCategoryListValidSchema = Joi.object().keys({
    page: Joi.number().required().min(1).integer(),
    limit: Joi.number().required().integer().min(1)
        .max(20),
    orderBy: Joi.string().min(1).max(250).required(),
    direction: Joi.string().valid('DESC', 'ASC').required(),
    wordFilter: Joi.string().min(1).max(250),
});

export async function getCategoryListValidator(req, res, next) {
    const { query } = req;

    const result = Joi.validate(query, getCategoryListValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
