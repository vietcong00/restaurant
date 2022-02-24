import {
    respondSuccess,
    logSystemError,
} from '../../helpers/messageResponse';
import foodService from './foodService';

export async function getList(req, res) {
    try {
        const { query } = req;
        const pageNumber = +query.page;
        const limit = +query.limit;
        const offset = (pageNumber - 1) * limit;

        const result = await foodService.getListFood({
            offset,
            limit,
            orderBy: query.orderBy,
            direction: query.direction,
            wordFilter: query.wordFilter,
            idCategory: query.idCategory,
        });
        return res.json(
            respondSuccess({ items: result.foods, totalItems: result.total }),
        );
    } catch (error) {
        return logSystemError(res, error, 'foodController - getList');
    }
}
export async function create(req, res) {
    try {
        const food = req.body;
        food.createdBy = req.loginUser.id;
        const result = await foodService.createFood(food);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'foodController - create');
    }
}
export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.foodData));
    } catch (error) {
        return logSystemError(res, error, 'foodController - getDetail');
    }
}
export async function update(req, res) {
    try {
        const food = req.body;
        food.updatedBy = req.loginUser.id;
        const result = await foodService.updateFood(req.params?.id, food);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'foodController - update');
    }
}

export async function deleteFood(req, res) {
    try {
        const idUser = req.loginUser.id;
        const idFood = req.params?.id;
        await foodService.updateFood(idFood, { deletedBy: idUser });
        const result = await foodService.deleteFood(idFood, idUser);
        return res.json(result);
    } catch (error) {
        return logSystemError(res, error, 'userController - deleteUser');
    }
}
