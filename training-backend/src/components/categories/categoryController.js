import {
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import categoryService from './categoryService';

export async function getList(req, res) {
    try {
        const { query } = req;
        const pageNumber = +query.page;
        const limit = +query.limit;
        const offset = (pageNumber - 1) * limit;

        const result = await categoryService.getCategoryList({
            offset,
            limit,
            orderBy: query.orderBy,
            direction: query.direction,
        });
        return res.json(
            respondSuccess({ items: result.categories, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'categoryController - getList');
    }
}
