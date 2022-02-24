import { tokenService } from './../../utils/token';
import { checkSuccessRequest } from '@/utils/util';
import {
    PAGE_SIZE_DEFAULT,
    CURRENT_PAGE_DEFAULT,
    ORDER_BY_DEFAULT,
    ORDER_DIRECTION_DEFAULT,
    WORD_FILTER_DEFAULT,
    ID_CATEGORY_DEFAULT,
    CLOSE_MODAL_KEYWORD,
    NUMBER_CATEGORY_LOAD_DEFAULT,
    PRODUCT_SELECTED_DEFAULT,
    ID_DASHBOARDS,
    FOOD_SELECTED_DEFAULT,
} from './constants';
import { getModule, VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import store from '@/store';
import {
    productService,
    categoryService,
    foodService,
    tableService,
    restaurantService,
    bookingService,
} from './services/api.service';
import {
    ICategory,
    IPageObject,
    TModalType,
    IFood,
    ITable,
    IRestaurant,
    IPatchQueryTable,
    IProduct,
    IBooking,
    IPatchBooking,
} from './types';

@Module({ dynamic: true, namespaced: true, store, name: 'productStore' })
class ProductStore extends VuexModule {
    productList: Array<IProduct> = [];
    productSelected: IProduct = { ...PRODUCT_SELECTED_DEFAULT };
    foodSelected: IFood = { ...FOOD_SELECTED_DEFAULT };

    typeModal: TModalType = CLOSE_MODAL_KEYWORD;
    totalFood = 0;
    categoryList: Array<ICategory> = [];
    pageInfo: IPageObject = {
        page: CURRENT_PAGE_DEFAULT,
        limit: PAGE_SIZE_DEFAULT.number,
        orderBy: ORDER_BY_DEFAULT,
        direction: ORDER_DIRECTION_DEFAULT,
        wordFilter: WORD_FILTER_DEFAULT,
        idCategory: ID_CATEGORY_DEFAULT,
    };

    pageBookingInfo: IPageObject = {
        page: CURRENT_PAGE_DEFAULT,
        limit: PAGE_SIZE_DEFAULT.number,
        orderBy: ORDER_BY_DEFAULT,
        direction: ORDER_DIRECTION_DEFAULT,
        wordFilter: WORD_FILTER_DEFAULT,
        idCategory: ID_CATEGORY_DEFAULT,
    };

    isSearching = false;

    notifyResultSearch = '';
    numberCategoryLoad = NUMBER_CATEGORY_LOAD_DEFAULT;
    totalCategory = 0;

    foodList: Array<IFood> = [];
    tableList: Array<ITable> = [];
    restaurantList: Array<IRestaurant> = [];
    tableSelected = -1;
    numberPeople = -1;
    idRestaurant = 1;

    bookingList: Array<IBooking> = [];
    bookingTableDetailList: Array<IBooking> = [];
    totalBooking = 0;
    totalBookingTableDetail = 0;

    idItemDashBoardSelected = 0;
    isShowModalChosenTable = false;
    isShowModalTableDetail = false;
    idBookingSelected = -1;

    get getProductList() {
        return this.productList;
    }

    get getProductSelected() {
        return this.productSelected;
    }

    get getFoodSelected() {
        return this.foodSelected;
    }

    get getTypeModal() {
        return this.typeModal;
    }

    get getCategoryList() {
        return this.categoryList;
    }

    get getTotalFood() {
        return this.totalFood;
    }

    get getPageInfo() {
        return this.pageInfo;
    }

    get getPageBookingInfo() {
        return this.pageBookingInfo;
    }

    get getNotifyResultSearch() {
        return this.notifyResultSearch;
    }

    get canGetMoreCategory() {
        return this.numberCategoryLoad < this.totalCategory;
    }

    get checkIsSearching() {
        return this.isSearching;
    }

    get getFoodList() {
        return this.foodList;
    }

    get getTableList() {
        return this.tableList;
    }

    get getTableSelected() {
        return this.tableSelected;
    }

    get getRestaurantList() {
        return this.restaurantList;
    }

    get getNumberPeople() {
        return this.numberPeople;
    }

    get getIdItemDashBoardSelected() {
        return this.idItemDashBoardSelected;
    }

    get getBookingList() {
        return this.bookingList;
    }

    get getBookingTableDetailList() {
        return this.bookingTableDetailList;
    }

    get getTotalBookingTableDetail() {
        return this.totalBookingTableDetail;
    }

    get getTotalBooking() {
        return this.totalBooking;
    }

    get checkShowModalChosenTable() {
        return this.isShowModalChosenTable;
    }

    get checkShowModalTableDetail() {
        return this.isShowModalTableDetail;
    }

    @Mutation
    SET_TYPE_MODAL(data: TModalType) {
        this.typeModal = data;
    }

    @Mutation
    SET_CATEGORIES(data: Array<ICategory>) {
        this.categoryList = data;
    }

    @Mutation
    SET_TOTAL_FOOD(data: number) {
        this.totalFood = data;
    }

    @Mutation
    SET_PAGE_INFO_PROPERTY(propertyData: { name: string; data: number | string }) {
        this.pageInfo[propertyData.name] = propertyData.data;
    }

    @Mutation
    SET_PAGE_BOOKING_INFO_PROPERTY(propertyData: {
        name: string;
        data: number | string;
    }) {
        this.pageBookingInfo[propertyData.name] = propertyData.data;
    }

    @Mutation
    SET_NOTIFY_RESULT_SEARCH(data: string) {
        this.notifyResultSearch = data;
    }

    @Mutation
    UPDATE_NUMBER_CATEGORY_LOAD(data: number) {
        this.numberCategoryLoad += data;
    }

    @Mutation
    SET_TOTAL_CATEGORY(data: number) {
        this.totalCategory = data;
    }

    @Mutation
    SET_IS_SEARCHING(data: boolean) {
        this.isSearching = data;
    }

    @Mutation
    UPDATE_FOODS(data: Array<IFood>) {
        this.foodList = data;
    }

    @Mutation
    UPDATE_BOOKINGS(data: Array<IBooking>) {
        this.bookingList = data;
    }

    @Mutation
    UPDATE_TABLES(data: Array<ITable>) {
        this.tableList = data;
    }

    @Mutation
    UPDATE_RESTAURANT(data: Array<IRestaurant>) {
        this.restaurantList = data;
    }

    @Mutation
    SET_SELECTED_TABLE(data: number) {
        this.tableSelected = data;
    }

    @Mutation
    SET_NUMBER_PEOPLE(data: number) {
        this.numberPeople = data;
    }

    @Mutation
    UPDATE_ID_RESTAURANT(data: number) {
        this.idRestaurant = data;
    }

    @Mutation
    UPDATE_ID_ITEM_DASHBOARD_SELECTED(data: number) {
        this.idItemDashBoardSelected = data;
    }

    @Mutation
    SET_PRODUCTS(data: Array<IProduct>) {
        this.productList = data;
    }

    @Mutation
    SET_PRODUCT_SELECTED(data: IProduct) {
        this.productSelected = data;
    }

    @Mutation
    SET_FOOD_SELECTED(data: IFood) {
        this.foodSelected = data;
    }

    @Mutation
    UPDATE_TOTAL_BOOKING(data: number) {
        this.totalBooking = data;
    }

    @Mutation
    UPDATE_TOTAL_BOOKING_TABLE_DETAIL(data: number) {
        this.totalBookingTableDetail = data;
    }

    @Mutation
    UPDATE_CHECK_SHOW_MODAL_CHOSEN_TABLE(data: boolean) {
        this.isShowModalChosenTable = data;
    }

    @Mutation
    UPDATE_CHECK_SHOW_MODAL_TABLE_DETAIL(data: boolean) {
        this.isShowModalTableDetail = data;
    }

    @Mutation
    UPDATE_ID_BOOKING_SELECTED(data: number) {
        this.idBookingSelected = data;
    }

    @Mutation
    UPDATE_BOOKING_TABLE_DETAIL_LIST(data: Array<IBooking>) {
        this.bookingTableDetailList = data;
    }

    @Action
    setPageSize(data: number) {
        switch (this.idItemDashBoardSelected) {
            case ID_DASHBOARDS.ID_BOOKING:
                this.SET_PAGE_BOOKING_INFO_PROPERTY({ name: 'limit', data });
                this.getBookings();
                break;
            case ID_DASHBOARDS.ID_MENU:
                this.SET_PAGE_INFO_PROPERTY({ name: 'limit', data });
                // this.getProducts();
                break;
            default:
                break;
        }
    }

    @Action
    getCategories(wordFilter: string) {
        const query: any = {
            limit: this.numberCategoryLoad,
            page: CURRENT_PAGE_DEFAULT,
            orderBy: ORDER_BY_DEFAULT,
            direction: ORDER_DIRECTION_DEFAULT,
        };
        if (wordFilter) {
            query.wordFilter = wordFilter;
        }
        categoryService.getList(query).then((response) => {
            if (response.code === 200) {
                this.SET_CATEGORIES(response.data.items);
                this.SET_TOTAL_CATEGORY(response.data.totalItems);
            }
        });
    }

    @Action
    getMoreCategories() {
        this.UPDATE_NUMBER_CATEGORY_LOAD(NUMBER_CATEGORY_LOAD_DEFAULT);
        this.getCategories('');
    }

    @Action
    setNotifyResultSearch() {
        let notifyResultSearch = `Kết quả tìm kiếm cho ${this.pageInfo.wordFilter};${this.pageInfo.idCategory}.`;
        if (this.totalFood) {
            notifyResultSearch += ` Đã tìm thấy ${this.totalFood} kết quả phù hợp!`;
        } else {
            notifyResultSearch += ` Không tìm thấy kết quả phù hợp!`;
        }
        this.SET_NOTIFY_RESULT_SEARCH(notifyResultSearch);
    }

    @Action
    setPageInfoProperty(property: { name: string; data: number | string }) {
        switch (this.idItemDashBoardSelected) {
            case ID_DASHBOARDS.ID_BOOKING:
                this.SET_PAGE_BOOKING_INFO_PROPERTY({
                    name: property.name,
                    data: property.data,
                });
                this.getBookings();
                break;
            case ID_DASHBOARDS.ID_MENU:
                this.SET_PAGE_INFO_PROPERTY({ name: property.name, data: property.data });
                this.getFoods();
                // this.getProducts();
                break;
            default:
                break;
        }
    }

    @Action
    setTypeModal(data: TModalType) {
        this.SET_TYPE_MODAL(data);
    }

    @Action
    setProductSelected(data: IProduct) {
        this.SET_PRODUCT_SELECTED({ ...data });
    }

    @Action
    setFoodSelected(data: IFood) {
        this.SET_FOOD_SELECTED({ ...data });
    }

    @Action
    setIsSearching(data: boolean) {
        this.SET_IS_SEARCHING(data);
    }

    @Action
    setTableSelected(data: number) {
        this.SET_SELECTED_TABLE(data);
    }

    @Action
    setNumberPeople(data: number) {
        this.SET_NUMBER_PEOPLE(data);
    }

    @Action
    setIdRestaurant(data: number) {
        this.UPDATE_ID_RESTAURANT(data);
    }

    @Action
    updateIdItemDashboardSelected(data: number) {
        this.UPDATE_ID_ITEM_DASHBOARD_SELECTED(data);
    }

    @Action
    updateCheckShowModalChosenTable(data: boolean) {
        this.SET_SELECTED_TABLE(-1);
        this.UPDATE_CHECK_SHOW_MODAL_CHOSEN_TABLE(data);
    }

    @Action
    updateCheckShowModalTableDetail(data: boolean) {
        this.UPDATE_CHECK_SHOW_MODAL_TABLE_DETAIL(data);
    }

    @Action
    updateIdBookingSelected(data: number) {
        this.UPDATE_ID_BOOKING_SELECTED(data);
    }

    @Action
    updateBookingTableDetailList(data: Array<IBooking>) {
        this.UPDATE_BOOKING_TABLE_DETAIL_LIST(data);
    }

    @Action
    updateTotalBookingTableDetail(data: number) {
        this.UPDATE_TOTAL_BOOKING_TABLE_DETAIL(data);
    }

    // API Product
    // @Action
    // getProducts() {
    //     const query: any = {
    //         limit: this.pageInfo.limit,
    //         page: this.pageInfo.page,
    //         orderBy: this.pageInfo.orderBy,
    //         direction: this.pageInfo.direction,
    //     };
    //     if (this.pageInfo.wordFilter) {
    //         query.wordFilter = this.pageInfo.wordFilter;
    //     }

    //     if (this.pageInfo.idCategory) {
    //         query.idCategory = this.pageInfo.idCategory;
    //     }
    //     productService.getList(query).then((response) => {
    //         if (response.code === 200) {
    //             this.SET_PRODUCTS(response.data.items);
    //             this.SET_TOTAL_PRODUCT(response.data.totalItems);
    //         }
    //     });
    // }

    // @Action
    // postProduct() {
    //     productService
    //         .create({
    //             name: this.productSelected.name,
    //             descriptions: this.productSelected.descriptions,
    //             idCategory: this.productSelected.category?.id ?? '',
    //         })
    //         .then((response) => {
    //             if (checkSuccessRequest(response)) {
    //                 this.getProducts();
    //                 this.setProductSelected({ ...PRODUCT_SELECTED_DEFAULT });
    //                 this.refreshPage();
    //             }
    //         });
    // }

    // @Action
    // patchProduct() {
    //     productService
    //         .update(this.productSelected.id, {
    //             name: this.productSelected.name,
    //             descriptions: this.productSelected.descriptions,
    //             idCategory: this.productSelected.category?.id ?? '',
    //         })
    //         .then((response) => {
    //             if (checkSuccessRequest(response)) {
    //                 this.getProducts();
    //                 this.setProductSelected({ ...PRODUCT_SELECTED_DEFAULT });
    //             }
    //         });
    // }

    // @Action
    // deleteProduct(idProduct: number) {
    //     productService.delete(idProduct).then((response) => {
    //         if (checkSuccessRequest(response)) {
    //             this.getProducts();
    //         }
    //     });
    // }

    // API Food
    @Action
    async getFoods() {
        const query: any = {
            limit: this.pageInfo.limit,
            page: this.pageInfo.page,
            orderBy: this.pageInfo.orderBy,
            direction: this.pageInfo.direction,
        };

        foodService.getList(query).then((response) => {
            if (response.code === 200) {
                this.UPDATE_FOODS(response.data.items);
            }
        });
    }

    @Action
    postFood() {
        foodService
            .create({
                name: this.foodSelected.name,
                descriptions: this.foodSelected.descriptions,
                idCategory: this.foodSelected.category?.id ?? '',
                imgLink: this.foodSelected.imgLink ?? 'menu1.jpg',
                price: this.foodSelected.price,
            })
            .then((response) => {
                if (checkSuccessRequest(response)) {
                    this.getFoods();
                    this.setFoodSelected({ ...FOOD_SELECTED_DEFAULT });
                    this.refreshPage();
                }
            });
    }

    @Action
    patchFood() {
        foodService
            .update(this.foodSelected.id, {
                name: this.foodSelected.name,
                descriptions: this.foodSelected.descriptions,
                idCategory: this.foodSelected.category?.id ?? '',
                imgLink: this.foodSelected.imgLink ?? 'menu1.jpg',
                price: this.foodSelected.price,
            })
            .then((response) => {
                if (checkSuccessRequest(response)) {
                    this.getFoods();
                    this.setFoodSelected({ ...FOOD_SELECTED_DEFAULT });
                }
            });
    }

    @Action
    deleteProduct(idProduct: number) {
        productService.delete(idProduct).then((response) => {
            if (checkSuccessRequest(response)) {
                // this.getProducts();
            }
        });
    }

    @Action
    search(dataSearch: { wordFilter: string; idCategory: number | string }) {
        this.SET_PAGE_INFO_PROPERTY({ name: 'wordFilter', data: dataSearch.wordFilter });
        this.SET_PAGE_INFO_PROPERTY({ name: 'idCategory', data: dataSearch.idCategory });
        // this.getProducts();
    }

    @Action
    refreshPage() {
        this.SET_IS_SEARCHING(false);
        this.setProductSelected({ ...PRODUCT_SELECTED_DEFAULT });
        this.setPageInfoProperty({
            name: 'wordFilter',
            data: WORD_FILTER_DEFAULT,
        });
        this.setPageInfoProperty({
            name: 'idCategory',
            data: ID_CATEGORY_DEFAULT,
        });
        // this.getProducts();
    }

    // API Table
    @Action
    async getTables() {
        const query: any = {
            limit: this.pageInfo.limit,
            page: this.pageInfo.page,
            orderBy: this.pageInfo.orderBy,
            direction: this.pageInfo.direction,
            idRestaurant: tokenService.getProfile().idRestaurant,
        };

        tableService.getList(query).then((response) => {
            if (response.code === 200) {
                this.UPDATE_TABLES(response.data.items);
            }
        });
    }

    @Action
    patchTable(query: IPatchQueryTable) {
        tableService.update(this.tableSelected, query).then((response) => {
            if (checkSuccessRequest(response)) {
                this.getTables();
            }
        });
    }

    // API Restaurant
    @Action
    async getRestaurants() {
        const query: any = {
            limit: this.pageInfo.limit,
            page: this.pageInfo.page,
            orderBy: this.pageInfo.orderBy,
            direction: this.pageInfo.direction,
        };

        restaurantService.getList(query).then((response) => {
            if (response.code === 200) {
                this.UPDATE_RESTAURANT(response.data.items);
            }
        });
    }

    // API Bookings
    @Action
    getBookings() {
        const query: any = {
            limit: this.pageBookingInfo.limit,
            page: this.pageBookingInfo.page,
            orderBy: this.pageBookingInfo.orderBy,
            direction: this.pageBookingInfo.direction,
            idRestaurant: tokenService.getProfile().idRestaurant,
        };

        bookingService.getList(query).then((response) => {
            console.log(response);

            if (response.code === 200) {
                this.UPDATE_BOOKINGS(response.data.items);
                this.UPDATE_TOTAL_BOOKING(response.data.totalItems);
            }
        });
    }

    @Action
    getBookingsOfTableDetail() {
        const query: any = {
            limit: this.pageBookingInfo.limit,
            page: this.pageBookingInfo.page,
            orderBy: this.pageBookingInfo.orderBy,
            direction: this.pageBookingInfo.direction,
            idRestaurant: tokenService.getProfile().idRestaurant,
            idTable: this.tableSelected,
        };

        bookingService.getList(query).then((response) => {
            console.log(response);

            if (response.code === 200) {
                this.UPDATE_BOOKING_TABLE_DETAIL_LIST(response.data.items);
                this.UPDATE_TOTAL_BOOKING_TABLE_DETAIL(response.data.totalItems);
            }
        });
    }

    @Action
    searchBooking(text: string) {
        const query: any = {
            limit: this.pageBookingInfo.limit,
            page: this.pageBookingInfo.page,
            orderBy: this.pageBookingInfo.orderBy,
            direction: this.pageBookingInfo.direction,
            wordFilter: text,
            idRestaurant: tokenService.getProfile().idRestaurant,
        };

        bookingService.getList(query).then((response) => {
            if (response.code === 200) {
                this.UPDATE_BOOKINGS(response.data.items);
                this.UPDATE_TOTAL_BOOKING(response.data.totalItems);
            }
        });
    }

    @Action
    patchBooking(query: IPatchBooking) {
        bookingService.update(this.idBookingSelected, query).then((response) => {
            if (checkSuccessRequest(response)) {
                this.getBookings();
                this.getTables();
            }
        });
    }
}

export const productStore = getModule(ProductStore);
