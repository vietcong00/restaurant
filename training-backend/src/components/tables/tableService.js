import i18n from 'i18n';
import {
    respondWithError,
    respondSuccess,
} from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';
import { TABLE_ATTRIBUTES, TIME_BOOK_LIMIT } from './tableConstant';
import { RESTAURANT_ATTRIBUTES } from '../restaurants/restaurantConstant';

const db = require('../../models');

async function checkTimeBookTable(table) {
    if (table.status === 'booked') {
        const { id } = table;
        const now = new Date();
        if (Date.parse(now) - table.arrivalTime > TIME_BOOK_LIMIT) {
            table.status = 'ready';
            table.arrivalTime = 0;
            await db.Table.update(table, {
                where: { id },
            });
        }
        console.log(Date.parse(now));
    }
}

async function getListTable(query) {
    try {
        const wordFilter = query.wordFilter ?? '';
        const whereQuery = [
            {
                and: [{
                    name: {
                        like: `%${wordFilter}%`,
                    },
                },
                ],

            },
        ];
        if (query.idRestaurant) {
            const idRestaurant = +query.idRestaurant;
            whereQuery[0].and.push({ idRestaurant });
        }
        const result = await db.Table.findAndCountAll({
            offset: query.offset,
            limit: query.limit,
            order: [
                [query.orderBy, query.direction],
            ],
            attributes: TABLE_ATTRIBUTES,
            where: whereQuery,
            include: [{
                model: db.Restaurant,
                as: 'restaurant',
                attributes: RESTAURANT_ATTRIBUTES,
            }],
        });
        checkTimeBookTable(result.rows[0]);
        return { tables: result.rows, total: result.count };
    } catch (error) {
        logger.error(`Error in getTableListAndTotal ${error.message}`);
        throw error;
    }
}

async function updateTable(id, tableData) {
    try {
        if (tableData.status === 'ready') {
            const result = await db.Booking.findAndCountAll({
                where: {
                    idTable: id,
                    status: 'Waiting',
                },
            });

            if (result.count >= 1) {
                tableData.status = 'booked';
            }
        }
        const isSuccess = await db.Table.update(tableData, {
            where: { id },
        });
        return isSuccess;
    } catch (error) {
        logger.error(`Error in updateTable ${error.message}`);
        throw error;
    }
}

module.exports = {
    getListTable,
    updateTable,
};
