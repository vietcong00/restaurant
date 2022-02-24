// Header: tab Coctact + navbar + options(search + cart + account )
<template>
    <div class="header-comp">
        <general-information />
        <div class="navbar-option">
            <div class="navbar-option__content">
                <div class="narbar-header">
                    <!-- logo -->
                    <svg
                        width="34"
                        height="41"
                        viewBox="0 0 34 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.0332 0.945312L0.296997 10.8636V23.0707L17.0332 32.989L30.4589 25.3596V28.9836L17.0332 36.9945L0.296997 26.8855V31.2724L17.0332 41L33.7694 31.2724V19.0653L20.3436 26.8855V23.0707L33.7694 15.0598V10.8636L17.0332 0.945312Z"
                            fill="#0156FF"
                        />
                    </svg>
                </div>

                <!-- options -->
                <div class="options-header">
                    <!-- search option -->
                    <div class="icon-option-header search-option-header">
                        <el-input v-model="inputSearch" placeholder="Type something" />
                    </div>
                    <!-- account -->
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <div
                                class="
                                    icon-option-header icon-hover
                                    account-option-header
                                "
                            >
                                <img src="../../../../assets/images/avatar.png" />
                            </div>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item :icon="CirclePlus"
                                    >Tài khoản</el-dropdown-item
                                >
                                <el-dropdown-item :icon="CirclePlus"
                                    >Cài đặt</el-dropdown-item
                                >
                                <el-dropdown-item>Quên mật khẩu</el-dropdown-item>
                                <el-dropdown-item divided>Đăng xuất</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';
import GeneralInformation from './GeneralInformation.vue';

@Options({
    name: 'header',
    components: {
        CompIcon,
        GeneralInformation,
    },
})
export default class Header extends Vue {
    inputSearch = '';
}
</script>

<style lang="scss" scoped>
.header-comp {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 0 20px 0;
    padding: 0 10px 20px 10px;

    .navbar-option {
        padding-top: 20px;
        width: 100%;
        border-top: 1px solid #e5e5e5;

        .navbar-option__content {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 97%;
            max-width: 1350px !important;
            margin: 0 auto;
        }
    }
}

.narbar-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    .navbar-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 0px;
        list-style-type: none;
        .navbar-element {
            margin: 0px 0px 0px 20px;
            cursor: pointer;
        }
        .active {
            padding: 8px 26px;
            border: 2px solid #0156ff;
            border-radius: 50px;
            color: #0156ff;
        }
    }
}

.options-header {
    display: flex;
    align-items: center;
    .icon-option-header {
        margin-left: 15px;
    }
    .icon-hover {
        color: #ffffff;
        padding: 5px;

        &:hover {
            background-color: rgb(214, 214, 214);
            border-radius: 50%;
            cursor: pointer;
        }
    }

    .search-option-header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
