import { IGetListResponse } from '@/modules/common/types';
import { ElNotification } from 'element-plus';
import { IBodyResponse } from './../plugins/axios/types';
export function isJson(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
}

export function checkSuccessRequest(res: IGetListResponse | IBodyResponse): boolean {
    if (res.code === 200) {
        ElNotification({
            title: 'Success',
            message: res.message,
            type: 'success',
        });
        return true;
    } else {
        ElNotification({
            title: 'Error',
            message: res.message,
            type: 'error',
        });
        return false;
    }
}
