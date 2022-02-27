import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

// -----------------validate param id booking-----------------
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

// -----------------validate create booking-----------------
const createValidSchema = Joi.object().keys({
    nameCustomer: Joi.string().trim().min(1).max(50),
    phone: Joi.string().trim().min(1).max(50),
    numberPeople: Joi.number().integer().min(1).required(),
    arrivalTime: Joi.number().integer().min(1).required(),
    idRestaurant: Joi.number().required(),
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

// -----------------validate update booking-----------------
const bookingFormSchema = {
    id: Joi.number().min(0),
    status: Joi.string().min(1).max(50),
    nameCustomer: Joi.string().min(1).max(250),
    phone: Joi.string().min(1),
    idTable: Joi.number().min(-1),
    arrivalTime: Joi.date(),
};

const updateValidSchema = Joi.object().keys(bookingFormSchema);

export async function updateValidator(req, res, next) {
    const { body } = req;

    const result = Joi.validate(body, updateValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

// -----------------validate get list booking-----------------
const getBookingListValidSchema = Joi.object().keys({
    page: Joi.number().required().min(1).required(),
    limit: Joi.number().required().min(1).max(30),
    orderBy: Joi.string().min(1).max(50).required(),
    direction: Joi.string().valid('DESC', 'ASC').required(),
    idRestaurant: Joi.number().required(),
    idTable: Joi.number(),
    wordFilter: Joi.string(),
    status: Joi.string(),
});

export async function getBookingListValidator(req, res, next) {
    const { query } = req;

    const result = Joi.validate(query, getBookingListValidSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
