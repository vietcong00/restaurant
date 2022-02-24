const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

export function addFilterByDate(filterValue) {
    let [start = '', end = ''] = filterValue;

    if (!start) start = '1900-01-01 00:00:00';
    else start = `${start} 00:00:00`;
    if (!end) end = '9999-12-31 23:59:59';
    else end = `${end} 23:59:59`;
    return {
        [Op.between]: [start, end],
    };
}

export async function checkUniqueValue(model, query = {}) {
    try {
        const value = await models[model].findOne({
            where: query,
        });
        return !value;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('checkUniqueValue ', e);
        return false;
    }
}
