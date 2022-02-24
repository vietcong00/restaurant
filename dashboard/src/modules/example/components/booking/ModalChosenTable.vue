<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header-label"> Chọn bàn</slot>
                        <div class="close-icon" @click="closeModal">
                            <comp-icon :iconName="'close-icon'" />
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <el-scrollbar height="350px">
                                <table-diagram :listTable="getTableList" />
                            </el-scrollbar>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <el-button
                                plain
                                el-button
                                type="info"
                                class="modal-button"
                                @click="closeModal"
                                ><div class="text-btn">Hủy</div></el-button
                            >
                            <el-button
                                type="danger"
                                plain
                                class="modal-button"
                                @click="sendData()"
                                ><div class="text-btn">Lưu</div></el-button
                            >
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';

import { productStore } from '../../store';
import { ITable } from '../../types';
import TableDiagram from '../diagramTable/TableDiagram.vue';

@Options({
    name: 'modal-chosen-table',

    components: {
        CompIcon,
        TableDiagram,
    },
})
export default class ModalChosenTable extends Vue {
    get getTableList(): Array<ITable> {
        return productStore.getTableList;
    }

    closeModal(): void {
        productStore.getBookings();
        productStore.updateCheckShowModalChosenTable(false);
    }

    sendData(): void {
        productStore.patchBooking({
            idTable: productStore.getTableSelected,
        });
        this.closeModal();
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
    width: 1000px;
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
