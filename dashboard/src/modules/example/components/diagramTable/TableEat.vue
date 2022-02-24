<template>
    <div class="table-item" :class="idTable === getTableSelected ? 'selected' : status">
        <div
            class="table-layout"
            @click="selectTable(idTable, status, numberSeat, arrivalTimeBooking)"
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
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ElMessageBox } from 'element-plus';
import { productStore } from '../../store';
import ModalTableDetailBooking from './ModalTableDetailBooking.vue';
import { IBooking } from '../../types';
import { LIMIT_ARRIVAL_TIME_BOOKING } from '../../constants';
import { getTimeFormatString } from '../../util';

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
        arrivalTimeBooking: {
            type: Number,
            default: 0,
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

    get getNumberPeople(): number {
        return productStore.getNumberPeople;
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
        idTable: number,
        status: string,
        numberSeat: number,
        arrivalTimeBooking: number,
    ): void {
        productStore.setTableSelected(idTable);
        if (this.checkShowModalChosenTable) {
            productStore.getBookingsOfTableDetail();
            for (let i = 0; i < this.getBookingTableDetailList.length; i++) {
                const timeStamp = this.getBookingTableDetailList[i].arrivalTime;
                const numberPeople = this.getBookingTableDetailList[i].numberPeople;
                console.log('seattttttttt: ', this.getBookingTableDetailList[i]);
                if (this.checkTimeBooking(arrivalTimeBooking, timeStamp)) {
                    if (this.checkNumberSeat(numberSeat, numberPeople)) {
                        break;
                    }
                } else {
                    break;
                }
            }
        } else {
            productStore.getBookingsOfTableDetail();
            productStore.updateCheckShowModalTableDetail(true);
        }
    }

    checkTimeBooking(oldTime: number, newTIme: number): boolean {
        if (Math.abs(oldTime - newTIme) < LIMIT_ARRIVAL_TIME_BOOKING) {
            const textWarning = `Bàn bạn vừa chọn đã bị đặt chỗ từ trước. Khách hàng sẽ đến vào lúc ${getTimeFormatString(
                oldTime,
            )}, Vui lòng chọn bàn khác!`;
            ElMessageBox.alert(textWarning, 'Warning', {
                confirmButtonText: 'OK',
            });
            return false;
        }
        return true;
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
}

.not-enough {
    padding: 10px;
    background: #e6e6e6;
    border: 1px solid #ffeded;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    opacity: 0.5;
    cursor: none;
}

.selected {
    background: #8dff93;
    border: 1px solid #ff0000;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.booked {
    background: #ebff78;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.used {
    background: #9eb3fa;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
