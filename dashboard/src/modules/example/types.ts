export interface ICategory {
    id: number | string;
    name: string;
}

export interface IGetCategories {
    categories: Array<ICategory>;
}

export interface IPageObject {
    [key: string]: number | string;
}

export type TModalType = 'Create' | 'Edit' | 'Close';

export interface ITextItem {
    name: string;
    number: number;
}

export interface ILogInForm {
    email: string | undefined;
    password: string | undefined;
}

export interface IFood {
    id: number;
    name: string;
    price: string;
    descriptions: string;
    imgLink: string;
    category: ICategory;
}

export interface IGetFoods {
    foods: Array<IFood>;
    totalProduct: number;
}

export interface ITable {
    id: number;
    name: string;
    status: string;
    numberSeat: number;
    idRestaurant: number;
}

export interface IGetTables {
    tables: Array<ITable>;
    totalProduct: number;
}

export interface IPatchQueryTable {
    status: string;
    nameCustomer?: string;
    phone?: string;
    arrivalTime?: string;
}
export interface IRestaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export interface IGetRestaurant {
    tables: Array<IRestaurant>;
    totalProduct: number;
}

export interface IDashboardIds {
    ID_STATISTICAL: number;
    ID_MENU: number;
    ID_BOOKING: number;
    ID_EMPLOYEE: number;
    ID_DIAGRAM_TABLE: number;
    ID_LOGOUT: number;
    ID_PAYMENT: number;
    ID_BILL: number;
}

export interface IProduct {
    id: number;
    name: string;
    descriptions: string;
    category: ICategory;
}

export interface IGetProducts {
    products: Array<IProduct>;
    totalProduct: number;
}

export interface IBooking {
    id: number;
    nameCustomer: string;
    phone: string;
    arrivalTime: number;
    status: string;
    table: ITable;
    idRestaurant: number;
    numberPeople: number;
}

export interface IGetBookings {
    bookings: Array<IBooking>;
    totalProduct: number;
}

export interface IPatchBooking {
    status?: string;
    idTable?: number;
}
