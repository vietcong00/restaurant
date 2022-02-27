<template>
    <div class="table-item" :class="idTable === getTableSelected ? 'selected' : ''">
        <div :class="status">
            <div
                class="table-layout"
                @click="
                    selectTable(checkShowModalChosenTable, idTable, status, numberSeat)
                "
                :class="numberSeat < getNumberPeople ? 'not-enough' : ''"
            >
                <img
                    class="table-img"
                    :src="
                        require(`../../../../assets/images/table/table-${getImgLink(
                            numberSeat,
                        )}.png`)
                    "
                    alt=""
                />
                <div class="table-name">{{ name }}</div>
            </div>
            <modal-table-detail-booking v-show="checkShowModalTableDetail" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { productStore } from '../../store';
import ModalTableDetailBooking from './ModalTableDetailBooking.vue';
import { IBooking } from '../../types';
import { ElMessageBox } from 'element-plus';
import { LIMIT_ARRIVAL_TIME_BOOKING } from '../../constants';

@Options({
    name: 'table',
    props: {
        idTable: {
            type: Number,
        },
        name: {
            type: String,
        },
        numberSeat: {
            type: Number,
        },
        status: {
            type: String,
        },
    },
    components: {
        ModalTableDetailBooking,
    },
})
export default class ProductTable extends Vue {
    get getTableSelected(): number {
        return productStore.getTableSelected;
    }

    get getArrivalTimeSelected(): number {
        return productStore.getArrivalTimeSelected;
    }

    get checkShowModalTableDetail(): boolean {
        return productStore.checkShowModalTableDetail;
    }

    get checkShowModalChosenTable(): boolean {
        return productStore.checkShowModalChosenTable;
    }

    get getBookingTableDetailList(): Array<IBooking> {
        return productStore.getBookingTableDetailList;
    }

    get getNumberPeople(): number {
        return productStore.getNumberPeople;
    }

    get getNumberSeatSelected(): number {
        return productStore.getNumberSeatSelected;
    }

    getImgLink(numberSeat: number): string {
        switch (numberSeat) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 4:
                return 'four';
            case 6:
                return 'six';
            case 8:
                return 'eight';
            case 10:
                return 'ten';
            default:
                return 'one';
        }
    }

    selectTable(
        isChosenTableModal: boolean,
        idTable: number,
        status: string,
        numberSeat: number,
    ): void {
        productStore.setTableSelected(idTable);
        productStore.setNumberSeatSelected(numberSeat);
        productStore.getBookingsOfTableDetail();
        let success = false;
        if (isChosenTableModal) {
            if (this.checkNumberSeat(this.getNumberPeople, numberSeat)) {
                success = true;
                if (status === 'used') {
                    const now = new Date();
                    if (
                        Math.abs(now.getTime() / 1000 - this.getArrivalTimeSelected) <
                        LIMIT_ARRIVAL_TIME_BOOKING
                    ) {
                        const textWarning = `Bàn bạn vừa chọn đang được sử dụng. Vui lòng chọn bàn khác!`;
                        ElMessageBox.alert(textWarning, 'Warning', {
                            confirmButtonText: 'OK',
                        });
                        success = false;
                    }
                }
            }
        } else {
            productStore.updateCheckShowModalTableDetail(true);
        }
        productStore.setCanChosenTable(success);
    }

    checkNumberSeat(numberPeople: number, numberSeat: number): boolean {
        if (numberPeople > numberSeat) {
            const textWarning = `Yêu cầu đặt bàn có ${numberPeople} chỗ. Bàn bạn vừa chọn chỉ có ${numberSeat} chỗ. Vui lòng chọn bàn khác!`;
            ElMessageBox.alert(textWarning, 'Warning', {
                confirmButtonText: 'OK',
            });
            return false;
        }
        return true;
    }
}
</script>

<style lang="scss" scoped>
.table-item {
    width: 15%;
    margin: 30px;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    .table-img {
        width: 50px;
        height: 50px;
    }
    .table-name {
        color: #000000;
        font-weight: 200;
    }
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        .table-name {
            font-weight: 700;
        }
    }
    .table-layout {
        padding: 10px;
    }
}

.not-enough {
    padding: 10px;
    background: #e6e6e6;
    border: 1px solid #ffeded;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    opacity: 0.2;
    cursor: none;
}

.selected {
    border: 1px solid #ff0000;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.booked {
    background: #ebff78;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.used {
    background: #9eb3fa;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
