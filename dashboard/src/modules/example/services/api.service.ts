import { productStore } from './../store';
import { checkSuccessRequest } from '@/utils/util';
import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';
import { TokenService } from '@/utils/token';
import { IBodyResponse } from '@/utils/types';
import { ILogInForm, IGetFoods } from '../types';
class AuthService extends BaseService {
    async Login<R extends IBodyResponse>(form: ILogInForm): Promise<void> {
        const response = await this.client.post<R, R>('login', form);
        if (checkSuccessRequest(response)) {
            const tokenService = new TokenService();
            tokenService.setAccessToken(response.data.accessToken.token);
            tokenService.setRefreshToken(response.data.refreshToken.token);
            tokenService.setAccessTokenExpiredAt(+response.data.accessToken.expiresIn);
            tokenService.setRefreshTokenExpiredAt(+response.data.refreshToken.expiresIn);
            tokenService.setProfile(response.data.profile);
        }
    }
}
export const authService = new AuthService({ baseUrl: '' }, service);

class ProductService extends BaseService {}
export const productService = new ProductService({ baseUrl: 'food' }, service);

class CategoryService extends BaseService {}
export const categoryService = new CategoryService({ baseUrl: 'category' }, service);
class FoodService extends BaseService {}
export const foodService = new FoodService({ baseUrl: 'food' }, service);
class TableService extends BaseService {}
export const tableService = new TableService({ baseUrl: 'table' }, service);
class RestaurantService extends BaseService {}
export const restaurantService = new RestaurantService(
    { baseUrl: 'restaurant' },
    service,
);

class BookingService extends BaseService {}
export const bookingService = new BookingService({ baseUrl: 'booking' }, service);
class ExampleService extends BaseService {
    async getFoods(): Promise<IGetFoods> {
        const res = await service.get('/foods.json');
        console.log(res);
        return res.data;
    }
}
export const exampleService = new ExampleService({ baseUrl: '/' }, service);
