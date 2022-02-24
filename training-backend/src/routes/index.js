const authApiRouter = require('../components/auth');
const userApiRouter = require('../components/users');
const productApiRouter = require('../components/products');
const categoryApiRouter = require('../components/categories');
const foodApiRouter = require('../components/foods');
const tableApiRouter = require('../components/tables');
const restaurantApiRouter = require('../components/restaurants');
const bookingApiRouter = require('../components/bookings');

const routerManager = (app) => {
    authApiRouter(app);
    userApiRouter(app);
    productApiRouter(app);
    categoryApiRouter(app);
    foodApiRouter(app);
    tableApiRouter(app);
    restaurantApiRouter(app);
    bookingApiRouter(app);
};

module.exports = routerManager;
