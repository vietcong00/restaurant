<template>
    <div
        class="item-dashboard"
        @click="selectItem(idItem)"
        :class="idItem === getIdItemDashBoardSelected ? 'selected' : ''"
    >
        <comp-icon
            v-show="idItem == getIdItemDashBoardSelected"
            class="icon-check"
            :iconName="'chevron-right-icon'"
        />
        <comp-icon class="icon-item" :iconName="iconName" />
        <div class="dashboard-item-name">
            {{ nameItem }}
        </div>
    </div>
</template>

<script lang="ts">
import { tokenService } from '@/utils/token';
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';
import { ID_DASHBOARDS } from '../../constants';
import { productStore } from '../../store';
import TableEat from '../diagramTable/TableEat.vue';

@Options({
    name: 'aside-component',
    components: {
        CompIcon,
        TableEat,
    },
    props: {
        idItem: {
            type: Number,
        },
        iconName: {
            type: String,
        },
        nameItem: {
            type: String,
        },
    },
})
export default class ProductTable extends Vue {
    get getIdItemDashBoardSelected(): number {
        return productStore.getIdItemDashBoardSelected;
    }

    selectItem(id: number): void {
        if (id === ID_DASHBOARDS.ID_LOGOUT) {
            tokenService.resetAll();
            window.location.reload();
        }
        productStore.updateIdItemDashboardSelected(id);
    }
}
</script>

<style lang="scss" scoped>
.item-dashboard {
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #dfdfdf;
    font-weight: 400;

    &:hover {
        cursor: pointer;
        border: 1px solid #ececec;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .icon-check {
        width: 15px;
        height: 15px;
        margin-bottom: 10px;
    }
    .icon-item {
        width: 40px;
        margin: 0 20px 0 10px;
    }
}

.selected {
    color: #ffffff;
    font-weight: 700;
    border: 1px solid #ececec;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
