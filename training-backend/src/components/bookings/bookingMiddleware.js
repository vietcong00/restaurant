import i18n from 'i18n';
import {
    respondWithError,
} from '../../helpers/messageResponse';
import { logger } from '../../helpers/logger';
import { ErrorCodes } from '../../helpers/constants';
import { BOOKING_ATTRIBUTES } from './bookingConstant';
import bookingService from './bookingService';


const db = require('../../models');

export async function checkExistBooking(req, res, next) {
    try {
        const { id } = req.params;
        let booking = await db.Booking.findByPk(id, {
            attributes: BOOKING_ATTRIBUTES,
            raw: true,
        });
        if (!booking) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_PRODUCT_NOT_EXIST, i18n.__('booking.check.BookingNotExist'), {}));
        }
        bookingService.checkTimeBookBooking(booking);
        booking = await db.Booking.findByPk(id, {
            attributes: BOOKING_ATTRIBUTES,
            raw: true,
        });
        req.bookingData = booking;
        return next();
    } catch (e) {
        logger.error(`Func: authenticate ; error in authenticate: ${e.message}`);
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, 'ERROR_CODE_UNAUTHORIZED'));
    }
}
