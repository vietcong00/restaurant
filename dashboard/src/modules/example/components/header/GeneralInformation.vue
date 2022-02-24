<template>
    <div class="general_information">
        <div class="general_information__content">
            <el-dropdown :hide-on-click="true">
                <span class="el-dropdown-link">
                    <div class="general_information__element">
                        <div class="day-open">
                            {{ dayOpen }}
                        </div>
                        <div class="time-open">
                            {{ timeOpen }}
                        </div>
                        <svg
                            width="6"
                            height="5"
                            viewBox="0 0 6 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 1.76929L3 3.76929L1 1.76929"
                                stroke="white"
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="(item, index) in dayOfWeek"
                            :key="index"
                            @click="changeTimeActive(item)"
                            >{{ item }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div
                class="
                    general_information__element
                    general_information__address-contact-group
                "
            >
                <div class="address-contact-group__address">
                    Visit our showroom in 1234 Street Adress City Address, 1234
                </div>
                <div class="address-contact-group__contact"><u>Contact Us</u></div>
            </div>
            <div class="general_information__element general-information__communications">
                <div class="communications-element">Call Us: (00) 1234 5678</div>
                <icon-component
                    class="communications-element"
                    :iconName="'facebook-icon'"
                />
                <icon-component
                    class="communications-element"
                    :iconName="'instagram-icon'"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IconComponent from '../../../../components/CompIcon.vue';

@Options({
    name: 'general-information',
    components: {
        IconComponent,
    },
})
export default class GeneralInformation extends Vue {
    dayOpen = 'Mon-Thu: ';
    timeOpen = '9:00 AM - 5:30 PM';
    dayOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    changeTimeActive(day: string) {
        switch (day) {
            case 'Monday':
            case 'Tuesday':
            case 'Wednesday':
            case 'Thursday':
                this.dayOpen = 'Mon-Thu: ';
                this.timeOpen = '9:00 AM - 5:30 PM';
                break;
            case 'Friday':
                this.dayOpen = 'Fri: ';
                this.timeOpen = '8:00 AM - 6:30 PM';
                break;
            case 'Saturday':
            case 'Sunday':
                this.dayOpen = 'Sat-Sun: ';
                this.timeOpen = '8:00 AM - 9:30 PM';
                break;

            default:
                break;
        }
    }
}
</script>

<style lang="scss" scoped>
.general_information {
    width: 100%;
    background-color: #000;
    .general_information__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        max-width: 1400px !important;
        padding: 8px;
        margin: 0 auto;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;

        .general_information__element {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: rgb(255, 255, 255);
        }
        .day-open {
            margin-right: 5px;
            color: rgb(170, 170, 170);
        }
        .time-open {
            margin-right: 10px;
        }
        .address-contact-group__address {
            margin-right: 5px;
            color: rgb(170, 170, 170);
        }
        .communications-element {
            margin-left: 12.5px;
        }
    }
}
</style>
