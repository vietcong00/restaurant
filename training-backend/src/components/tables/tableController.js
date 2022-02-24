import {
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import tableService from './tableService';

export async function getList(req, res) {
    try {
        const { query } = req;
        const pageNumber = +query.page;
        const limit = +query.limit;
        const offset = (pageNumber - 1) * limit;

        const result = await tableService.getListTable({
            offset,
            limit,
            orderBy: query.orderBy,
            direction: query.direction,
            wordFilter: query.wordFilter,
            idRestaurant: query.idRestaurant,
        });
        return res.json(
            respondSuccess({ items: result.tables, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'tableController - getList');
    }
}

export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.tableData));
    } catch (error) {
        return logSystemError(res, error, 'tableController - getDetail');
    }
}
export async function update(req, res) {
    try {
        const table = req.body;
        // table.updatedBy = req.loginUser.id;
        const result = await tableService.updateTable(req.params?.id, table);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'tableController - update');
    }
}
