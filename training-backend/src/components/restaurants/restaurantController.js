import {
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import restaurantService from './restaurantService';

export async function getList(req, res) {
    try {
        const { query } = req;
        const pageNumber = +query.page;
        const limit = +query.limit;
        const offset = (pageNumber - 1) * limit;

        const result = await restaurantService.getListRestaurant({
            offset,
            limit,
            orderBy: query.orderBy,
            direction: query.direction,
        });
        return res.json(
            respondSuccess({ items: result.restaurants, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'restaurantController - getList');
    }
}

export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.restaurantData));
    } catch (error) {
        return logSystemError(res, error, 'restaurantController - getDetail');
    }
}
