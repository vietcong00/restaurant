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
    IPostQueryBooking,
} from './types';

@Module({ dynamic: true, namespaced: true, store, name: 'productStore' })
class ProductStore extends VuexModule {
    typeModal: TModalType = CLOSE_MODAL_KEYWORD;
    totalProduct = 0;
    categoryList: Array<ICategory> = [];
    pageInfo: IPageObject = {
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

    get getTypeModal() {
        return this.typeModal;
    }

    get getCategoryList() {
        return this.categoryList;
    }

    get getTotalProduct() {
        return this.totalProduct;
    }

    get getPageInfo() {
        return this.pageInfo;
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

    get getIdRestaurant() {
        return this.idRestaurant;
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
    SET_TOTAL_PRODUCT(data: number) {
        this.totalProduct = data;
    }

    @Mutation
    SET_PAGE_INFO_PROPERTY(propertyData: { name: string; data: number | string }) {
        this.pageInfo[propertyData.name] = propertyData.data;
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
    UPDATE_TABLES(data: Array<ITable>) {
        this.tableList = data;
    }

    @Mutation
    UPDATE_RESTAURANT(data: Array<IRestaurant>) {
        this.restaurantList = data;
    }

    @Mutation
    SET_SELECTED_NUMBER(data: number) {
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
        if (this.totalProduct) {
            notifyResultSearch += ` Đã tìm thấy ${this.totalProduct} kết quả phù hợp!`;
        } else {
            notifyResultSearch += ` Không tìm thấy kết quả phù hợp!`;
        }
        this.SET_NOTIFY_RESULT_SEARCH(notifyResultSearch);
    }

    @Action
    setIsSearching(data: boolean) {
        this.SET_IS_SEARCHING(data);
    }

    @Action
    setTableSelected(data: number) {
        this.SET_SELECTED_NUMBER(data);
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
    async getTables() {
        const query: any = {
            limit: this.pageInfo.limit,
            page: this.pageInfo.page,
            orderBy: this.pageInfo.orderBy,
            direction: this.pageInfo.direction,
            idRestaurant: this.idRestaurant,
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
        // this.UPDATE_PRODUCTS(result.products);
        // this.UPDATE_FILTER_OPTIONS(result.filterOptions);
        // this.UPDATE_PRODUCT_LIST_FILTER(result.products);
        // this.changePage(CURRENT_PAGE_DEFAULT);
    }

    @Action
    bookTable() {
        productService
            .update(this.tableSelected, {
                status: 'booked',
            })
            .then((response) => {
                if (checkSuccessRequest(response)) {
                    this.getTables();
                }
            });
    }

    @Action
    postBooking(query: IPostQueryBooking) {
        bookingService.create(query).then((response) => {
            if (checkSuccessRequest(response)) {
            }
        });
    }
}

export const productStore = getModule(ProductStore);
