import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';
import { BOOKING_ATTRIBUTES, TIME_BOOK_LIMIT } from './bookingConstant';
import { TABLE_ATTRIBUTES } from '../tables/tableConstant';

const db = require('../../models');

async function checkTimeBookBooking(booking) {
    if (booking.status === 'Waiting') {
        const { id } = booking;
        const now = new Date();
        if (Date.parse(now) / 1000 - booking.arrivalTime > TIME_BOOK_LIMIT) {
            const isSuccess = await db.Booking.update({
                status: 'Canceled',
            }, {
                where: { id },
            });
        }
    }
}

async function getListBooking(query) {
    try {
        const idRestaurant = +query.idRestaurant;
        const resultTest = await db.Booking.findAndCountAll({
            where: {
                idRestaurant,
                status: 'Waiting',
            },
        });
        resultTest.rows.forEach((element) => {
            checkTimeBookBooking(element);
        });
        let whereQuery = [];
        if (query.wordFilter !== undefined && query.wordFilter !== '') {
            const wordFilter = query.wordFilter ?? '';
            whereQuery = [
                {
                    and: [
                        { idRestaurant },
                        {
                            or: [
                                {
                                    nameCustomer: {
                                        like: `%${wordFilter}%`,
                                    },
                                },
                                {
                                    phone: {
                                        like: `%${wordFilter}%`,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ];
        } else {
            whereQuery = [{
                and: [
                    { idRestaurant },
                ],
            }];
        }
        if (query.idTable) {
            const idTable = +query.idTable;
            whereQuery[0].and.push({ idTable });
        }
        const result = await db.Booking.findAndCountAll({
            offset: query.offset,
            limit: query.limit,
            order: [
                [query.orderBy, query.direction],
            ],
            attributes: BOOKING_ATTRIBUTES,
            where: whereQuery,
            include: [{
                model: db.Table,
                as: 'table',
                attributes: TABLE_ATTRIBUTES,
            }],
        });
        checkTimeBookBooking(result.rows[0]);
        return { bookings: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getBookingListAndTotal ${error.message}`);
        throw error;
    }
}

async function updateBooking(id, bookingData) {
    try {
        const oldBooking = await db.Booking.findByPk(id);
        if (oldBooking.idTable != null) {
            const { idTable } = oldBooking;
            const result = await db.Booking.findAndCountAll({
                where: {
                    idTable,
                    status: 'Waiting',
                },
            });
            if (result.count <= 1) {
                await db.Table.update({ status: 'ready' }, {
                    where: {
                        id: idTable,
                    },
                });
            }
        }
        const isSuccess = await db.Booking.update(bookingData, {
            where: { id },
        });

        const newBooking = await db.Booking.findByPk(id);
        if (bookingData.idTable !== undefined && newBooking.status === 'Waiting') {
            const { idTable } = bookingData;
            await db.Table.update({ status: 'booked' }, {
                where: {
                    id: idTable,
                },
            });
        }

        return isSuccess;
    } catch (error) {
        logger.error(`Error in updateBooking ${error.message}`);
        throw error;
    }
}

async function createBooking(bookingData) {
    try {
        await db.Booking.create(bookingData);
        return respondSuccess();
    } catch (error) {
        logger.error(`Error in createBooking ${error.message}`);
        throw error;
    }
}

module.exports = {
    getListBooking,
    updateBooking,
    createBooking,
    checkTimeBookBooking,
};
