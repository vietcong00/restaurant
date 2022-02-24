import { AxiosResponse, AxiosInstance } from 'axios';

// Interfaces for general response of all apis
export interface IBodyResponse extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: number;
    message: string;
    data: any;
    errors?: { key: string; errorCode: number }[];
}

export interface IGetListResponse extends IBodyResponse {
    data: {
        items: Array<any>;
        totalItems: number;
    };
}

export interface IGetListParams {
    limit?: number;
    page?: number;
}

export interface IServiceOption {
    baseUrl: string;
}

export interface IService {
    client: AxiosInstance;
    baseUrl: string;
}

// Interfaces for sidebar
export interface ISubMenu {
    icon?: string;
    name: string;
    class?: string;
    to?: string;
    badge?: number | string;
    active: boolean;
    subdrop?: boolean;
    hasNotify?: boolean;
    childs?: ISubMenu[];
}

export interface IMenuGroup {
    title?: string;
    class?: string;
    submenu: ISubMenu[];
}

export interface IBreadcrumb {
    id: number;
    title: string;
    to?: string | Record<string, unknown>;
}

export interface IUserDetailBase {
    id: number;
    email: string;
}

export interface IProfile {
    id: number;
    email: string;
    fullName: string;
    phone: string;
    birthday: Date;
    position: string;
    idRestaurant: string;
}
