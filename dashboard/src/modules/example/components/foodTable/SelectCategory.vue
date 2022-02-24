<template>
    <el-select
        class="data-input-search-element select-category"
        v-model="selectCategory"
        clearable
        filterable
        remote
        :remote-method="remoteMethod"
        :loading="loading"
        placeholder="Chọn danh mục"
        value-key="id"
        @clear="setSelectCategory({ ...CATEGORY_NULL })"
        @visible-change="reloadCategoryList"
    >
        <el-option
            v-for="item in getCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item"
            @click="setSelectCategory(item)"
        >
        </el-option>
        <div
            class="get-more-category-btn"
            @click="getMoreCategory"
            v-show="canGetMoreCategory"
        >
            Xem thêm
        </div>
    </el-select>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';
import { CATEGORY_NULL } from '../../constants';
import { productStore } from '../../store';
import { ICategory } from '../../types';

@Options({
    name: 'select-category-component',
    props: {
        categoryProp: Object as PropType<ICategory>,
    },
    components: {
        CompIcon,
    },
    data() {
        return {
            selectCategory: { ...CATEGORY_NULL },
        };
    },
    watch: {
        categoryProp: function (newVal) {
            this.selectCategory = { ...newVal };
        },
    },
})
export default class SelectCategory extends Vue {
    categoryProp!: ICategory;
    selectCategory!: ICategory;
    loading = false;

    listCategory: ICategory[] = [];
    get getCategoryList(): ICategory[] {
        this.listCategory = productStore.getCategoryList;
        return this.listCategory;
    }

    get canGetMoreCategory(): boolean {
        return productStore.canGetMoreCategory;
    }

    remoteMethod(query: string): void {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            productStore.getCategories(query);
        }, 200);
    }

    getMoreCategory(): void {
        productStore.getMoreCategories();
    }

    setSelectCategory(category: ICategory): void {
        this.selectCategory = category;
        this.$emit('handleSelectCategory', category);
    }

    reloadCategoryList(isAppears: boolean): void {
        if (isAppears) {
            productStore.getCategories('');
        }
    }
}
</script>

<style></style>
