<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header-label" v-if="checkTypeModalIsCreate()">
                            Tạo mới sản phẩm</slot
                        >
                        <slot name="header-label" v-else> Chỉnh sửa sản phẩm</slot>
                        <div class="close-icon" @click="closeModal">
                            <comp-icon :iconName="'close-icon'" />
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <el-form
                                ref="food"
                                status-icon
                                :model="food"
                                label-width="150px"
                                class="demo-dynamic"
                                :rules="rules"
                            >
                                <el-form-item
                                    label="Id"
                                    prop="id"
                                    v-show="!checkTypeModalIsCreate()"
                                >
                                    <el-input
                                        class="element-data"
                                        v-model="food.id"
                                        disabled
                                    />
                                </el-form-item>
                                <el-form-item label="Tên sản phẩm" prop="name">
                                    <el-input
                                        v-model="food.name"
                                        placeholder="Ví dụ: Laptop MinhVu"
                                    />
                                </el-form-item>
                                <el-form-item label="Giá" prop="price">
                                    <el-input
                                        v-model="food.price"
                                        placeholder="Ví dụ: 100.000 VNĐ"
                                    />
                                </el-form-item>
                                <el-form-item label="Mô tả" prop="descriptions">
                                    <el-input
                                        v-model="food.descriptions"
                                        :autosize="{ minRows: 2, maxRows: 4 }"
                                        type="textarea"
                                        placeholder="Hãy nhập gì đó bất kỳ!"
                                    />
                                </el-form-item>
                                <el-form-item label="Danh mục" prop="category">
                                    <select-category
                                        :categoryProp="food.category"
                                        @handleSelectCategory="setCategorySelected"
                                    />
                                </el-form-item>
                            </el-form>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <el-button
                                type="danger"
                                plain
                                class="modal-button"
                                @click="sendData()"
                                ><div class="text-btn">Lưu</div></el-button
                            >
                            <el-button
                                type="info"
                                plain
                                class="modal-button"
                                @click="closeModal"
                                ><div class="text-btn">Hủy</div></el-button
                            >
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';

import {
    CREATE_MODAL_KEYWORD,
    EDIT_MODAL_KEYWORD,
    FOOD_SELECTED_DEFAULT,
    RULE_FOOD_ATTRIBUTE,
} from '../../constants';
import { productStore } from '../../store';
import { ICategory, IFood, TModalType } from '../../types';
import SelectCategory from './SelectCategory.vue';

@Options({
    name: 'modal-form-food-component',
    props: {
        foodProp: Object as PropType<IFood>,
    },
    components: {
        CompIcon,
        SelectCategory,
    },
    data() {
        return {
            food: { ...FOOD_SELECTED_DEFAULT },
        };
    },
    watch: {
        foodProp: function (newVal) {
            this.food = { ...newVal };
        },
    },
})
export default class ModalFormFood extends Vue {
    foodProp!: IFood;
    food!: IFood;
    loading = false;
    rules = RULE_FOOD_ATTRIBUTE;

    declare $refs: {
        food: any;
    };

    get getTypeModal(): TModalType {
        return productStore.getTypeModal;
    }

    checkTypeModalIsCreate(): boolean {
        return this.getTypeModal === CREATE_MODAL_KEYWORD;
    }

    closeModal(): void {
        productStore.setTypeModal('Close');
        this.$refs.food.resetFields();
        productStore.setFoodSelected({ ...FOOD_SELECTED_DEFAULT });
    }

    sendData(): void {
        (this.$refs?.food).validate(async (valid: unknown) => {
            if (valid) {
                productStore.setFoodSelected(this.food);
                switch (this.getTypeModal) {
                    case CREATE_MODAL_KEYWORD:
                        await productStore.postFood();
                        break;
                    case EDIT_MODAL_KEYWORD:
                        await productStore.patchFood();
                        break;
                }
                this.closeModal();
            } else {
                return false;
            }
        });
    }

    setCategorySelected(category: ICategory): void {
        this.food.category = category;
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-header {
    font-size: 24px;
    font-weight: 600;
    .close-icon {
        position: relative;
        right: -54px;
        top: -54px;
        display: flex;
        align-items: center;
        height: 27px;
        padding-bottom: 3px;
        background-color: #fff;
        border: 1px solid rgb(233, 230, 230);
        border-radius: 50%;
        &:hover {
            color: #fff;
            background-color: red;
            border: 2px solid rgb(158, 156, 156);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            cursor: pointer;
        }
    }
}

.modal-footer {
    display: flex;
    justify-content: space-evenly;
    .text-btn {
        font-weight: 600;
    }
    .modal-button:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}
</style>
