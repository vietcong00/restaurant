import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

export function loginValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function googleLoginValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        code: Joi.string().min(10).max(255).required(),
        redirectUri: Joi.string().min(10).max(255).required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function getLoginLinkValidator(req, res, next) {
    const { query } = req;
    const validSchema = Joi.object().keys({
        redirectUri: Joi.string().allow('').required(),
        state: Joi.string().allow('').allow(null)
            .optional(),
    });
    const result = Joi.validate(query, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function profileValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        fullName: Joi.string().max(255),
        furiganaName: Joi.string().max(255),
        gender: Joi.string().valid('male', 'female', 'other').required(),
        birthday: Joi.date().format('YYYY-MM-DD').optional(),
        phone: Joi.string().max(20).optional(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function passwordValidator(req, res, next) {
    const { body } = req;
    const validSchema = Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().min(6).max(20).required(),
    });

    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
