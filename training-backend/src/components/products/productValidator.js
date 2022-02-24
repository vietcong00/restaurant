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

// -----------------validate create product-----------------
const createValidSchema = Joi.object().keys({
    name: Joi.string().trim().min(1).max(50),
    descriptions: Joi.string().trim().min(1).max(250),
    idCategory: Joi.number().integer().min(1).required(),
});

export async function createValidator(req, res, next) {
    const { body } = req;

    const result = Joi.validate(body, createValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

// -----------------validate update product-----------------
const productFormSchema = {
    name: Joi.string().min(1).max(50),
    descriptions: Joi.string().min(1).max(250),
    idCategory: Joi.number().integer().min(1),
};

const updateValidSchema = Joi.object().keys(productFormSchema);

export async function updateValidator(req, res, next) {
    const { body } = req;

    const result = Joi.validate(body, updateValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

// -----------------validate get list product-----------------
const getProductListValidSchema = Joi.object().keys({
    page: Joi.number().required().min(1).required(),
    limit: Joi.number().required().min(1).max(20),
    orderBy: Joi.string().min(1).max(50).required(),
    direction: Joi.string().valid('DESC', 'ASC').required(),
    idCategory: Joi.number().min(1),
    wordFilter: Joi.string().min(1).max(50),
});

export async function getProductListValidator(req, res, next) {
    const { query } = req;

    const result = Joi.validate(query, getProductListValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
