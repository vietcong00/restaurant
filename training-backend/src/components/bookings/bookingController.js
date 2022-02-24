import {
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import bookingService from './bookingService';

export async function getList(req, res) {
    try {
        const { query } = req;
        const pageNumber = +query.page;
        const limit = +query.limit;
        const offset = (pageNumber - 1) * limit;

        const result = await bookingService.getListBooking({
            offset,
            limit,
            orderBy: query.orderBy,
            direction: query.direction,
            idRestaurant: query.idRestaurant,
            idTable: query.idTable,
            wordFilter: query.wordFilter,
        });
        return res.json(
            respondSuccess({ items: result.bookings, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'bookingController - getList');
    }
}

export async function create(req, res) {
    try {
        const booking = req.body;
        booking.status = 'Waiting';
        console.log('------------------------');
        console.log('------------------------');
        console.log(booking);
        console.log('------------------------');
        console.log('------------------------');

        // booking.createdBy = req.loginUser.id;
        const result = await bookingService.createBooking(booking);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'productController - create');
    }
}

export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.bookingData));
    } catch (error) {
        return logSystemError(res, error, 'bookingController - getDetail');
    }
}
export async function update(req, res) {
    try {
        const booking = req.body;
        // booking.updatedBy = req.loginUser.id;
        const result = await bookingService.updateBooking(req.params?.id, booking);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'bookingController - update');
    }
}
