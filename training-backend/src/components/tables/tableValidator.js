import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

// -----------------validate param id table-----------------
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

// -----------------validate update table-----------------
const tableFormSchema = {
    status: Joi.string().min(1).max(50),
    nameCustomer: Joi.string().min(1).max(250),
    phone: Joi.string().min(1),
    arrivalTime: Joi.date(),
};

const updateValidSchema = Joi.object().keys(tableFormSchema);

export async function updateValidator(req, res, next) {
    const { body } = req;

    const result = Joi.validate(body, updateValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

// -----------------validate get list table-----------------
const getTableListValidSchema = Joi.object().keys({
    page: Joi.number().required().min(1).required(),
    limit: Joi.number().required().min(1).max(20),
    orderBy: Joi.string().min(1).max(50).required(),
    direction: Joi.string().valid('DESC', 'ASC').required(),
    idRestaurant: Joi.number().min(1),
});

export async function getTableListValidator(req, res, next) {
    const { query } = req;

    const result = Joi.validate(query, getTableListValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
