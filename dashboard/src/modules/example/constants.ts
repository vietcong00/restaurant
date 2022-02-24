import { IDashboardIds } from './types';
export const CURRENT_PAGE_DEFAULT = 1;
export const ORDER_BY_DEFAULT = 'createdAt';
export const ORDER_DIRECTION_DEFAULT = 'DESC';
export const WORD_FILTER_DEFAULT = '';
export const ID_CATEGORY_DEFAULT = '';
export const CLOSE_MODAL_KEYWORD = 'Close';
export const CREATE_MODAL_KEYWORD = 'Create';
export const EDIT_MODAL_KEYWORD = 'Edit';
export const CATEGORY_NULL = {
    id: '',
    name: '',
};
export const PRODUCT_SELECTED_DEFAULT = {
    id: -1,
    name: '',
    descriptions: '',
    price: '',
    category: CATEGORY_NULL,
};

export const PAGE_SIZE_OPTIONS = [
    { name: '2 per page', number: 2 },
    { name: '5 per page', number: 5 },
    { name: '10 per page', number: 10 },
    { name: '15 per page', number: 15 },
    { name: '20 per page', number: 20 },
];

export const PAGE_SIZE_DEFAULT = { name: '20 per page', number: 20 };

export const NUMBER_CATEGORY_LOAD_DEFAULT = 20;

export const RULE_PRODUCT_ATTRIBUTE = {
    name: [
        {
            required: true,
            message: 'Vui lòng điền tên sản phẩm!',
            trigger: 'blur',
        },
        {
            max: 50,
            message: 'Độ dài của tên cần ít hơn 50 kí tự!',
            trigger: 'change',
        },
    ],
    descriptions: [
        {
            required: true,
            message: 'Hãy điền mô tả sản phẩm !',
            trigger: 'blur',
        },
        {
            max: 250,
            message: 'Độ dài của mô tả cần ít hơn 250 kí tự!',
            trigger: 'change',
        },
    ],
    category: [
        {
            required: true,
            message: 'Vui lòng chọn Danh mục !',
            trigger: 'change',
        },
    ],
};

export const NUMBER_PEOPLE = [
    { name: '1 người', number: 1 },
    { name: '2 người', number: 2 },
    { name: 'từ 3-4 người', number: 4 },
    { name: 'từ 5-6 người', number: 6 },
    { name: 'từ 7-8 người', number: 8 },
    { name: 'từ 9-10 người', number: 10 },
];

export const ID_DASHBOARDS: IDashboardIds = {
    ID_STATISTICAL: 0,
    ID_MENU: 1,
    ID_BOOKING: 2,
    ID_EMPLOYEE: 3,
    ID_DIAGRAM_TABLE: 4,
};

export const DASHBOARDS = [
    { id: ID_DASHBOARDS.ID_STATISTICAL, icon: 'chart-pie-icon', name: 'Thống kê' },
    { id: ID_DASHBOARDS.ID_MENU, icon: 'document-text-icon', name: 'Thực đơn' },
    { id: ID_DASHBOARDS.ID_BOOKING, icon: 'clock-icon', name: 'Danh sách đặt bàn' },
    { id: ID_DASHBOARDS.ID_EMPLOYEE, icon: 'user-group-icon', name: 'Nhân viên' },
    { id: ID_DASHBOARDS.ID_DIAGRAM_TABLE, icon: 'dinning-table-icon', name: 'Sơ đồ bàn' },
];

export const LIMIT_ARRIVAL_TIME_BOOKING = 10800;