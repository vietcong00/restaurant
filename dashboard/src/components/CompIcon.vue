<template>
    <div class="icon-component">
        <!--  Close Modal icon -->
        <div class="icon-customer" v-if="IconChosen === 'close-icon'">
            <svg
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <!-- Edit Product icon -->
        <div class="icon-customer" v-if="IconChosen === 'edit-icon'">
            <svg
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
            </svg>
        </div>
        <!-- Delete Product icon -->
        <div class="icon-customer" v-if="IconChosen === 'delete-icon'">
            <svg
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
        </div>

        <!-- Search Product icon -->
        <div class="icon-customer" v-if="IconChosen === 'search-icon'">
            <svg
                height="15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
        <!-- Create Product icon -->
        <div class="icon-customer" v-if="IconChosen === 'create-icon'">
            <svg
                height="15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        </div>
        <!-- Show Result Search - Light icon -->
        <div class="icon-customer" v-if="IconChosen === 'light-icon'">
            <svg
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        </div>
        <!-- User icon -->
        <div class="icon-customer" v-if="IconChosen === 'user-icon'">
            <svg
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>
        </div>
        <!-- Password icon -->
        <div class="icon-customer" v-if="IconChosen === 'locked-icon'">
            <svg
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
            </svg>
        </div>
        <!-- Refresh icon -->
        <div class="icon-customer" v-if="IconChosen === 'refresh-icon'">
            <svg
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
            </svg>
        </div>
        <!-- chevron-right icon -->
        <div class="icon-customer" v-if="IconChosen === 'chevron-right-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </div>
        <!-- chart-alt icon -->
        <div class="icon-customer" v-if="IconChosen === 'chart-alt-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
            </svg>
        </div>
        <!--  document-text-icon -->
        <div class="icon-customer" v-if="IconChosen === 'document-text-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        </div>
        <!--  users-icon -->
        <div class="icon-customer" v-if="IconChosen === 'users-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
        </div>
        <!--  user-group-icon -->
        <div class="icon-customer" v-if="IconChosen === 'user-group-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        </div>
        <!--  chart-pie-icon -->
        <div class="icon-customer" v-if="IconChosen === 'chart-pie-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
            </svg>
        </div>
        <!--  clock-icon -->
        <div class="icon-customer" v-if="IconChosen === 'clock-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <!-- facebook icon -->
        <div class="icon-customer" v-if="IconChosen === 'facebook-icon'">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.1054 0.276611H0.894536C0.55278 0.276611 0.276672 0.552719 0.276672 0.894475V15.1053C0.276672 15.4471 0.55278 15.7232 0.894536 15.7232H15.1054C15.4471 15.7232 15.7233 15.4471 15.7233 15.1053V0.894475C15.7233 0.552719 15.4471 0.276611 15.1054 0.276611ZM13.3213 4.78508H12.0875C11.1202 4.78508 10.9329 5.24462 10.9329 5.92041V7.40907H13.2421L12.9409 9.73957H10.9329V15.7232H8.52515V9.74151H6.5113V7.40907H8.52515V5.69064C8.52515 3.6961 9.7435 2.60905 11.5237 2.60905C12.3771 2.60905 13.1089 2.67276 13.3232 2.70173V4.78508H13.3213Z"
                    fill="white"
                />
            </svg>
        </div>
        <!-- Instagram icon -->
        <div class="icon-customer" v-if="IconChosen === 'instagram-icon'">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.99997 5.39658C6.56638 5.39658 5.39646 6.5665 5.39646 8.00009C5.39646 9.43368 6.56638 10.6036 7.99997 10.6036C9.43357 10.6036 10.6035 9.43368 10.6035 8.00009C10.6035 6.5665 9.43357 5.39658 7.99997 5.39658ZM15.8086 8.00009C15.8086 6.92197 15.8183 5.85361 15.7578 4.77744C15.6972 3.52744 15.4121 2.41806 14.498 1.504C13.582 0.587983 12.4746 0.30478 11.2246 0.244233C10.1465 0.183686 9.0781 0.193452 8.00192 0.193452C6.9238 0.193452 5.85544 0.183686 4.77927 0.244233C3.52927 0.30478 2.41989 0.589936 1.50583 1.504C0.589814 2.42001 0.306611 3.52744 0.246064 4.77744C0.185517 5.85556 0.195283 6.92392 0.195283 8.00009C0.195283 9.07626 0.185517 10.1466 0.246064 11.2227C0.306611 12.4727 0.591768 13.5821 1.50583 14.4962C2.42185 15.4122 3.52927 15.6954 4.77927 15.7559C5.85739 15.8165 6.92575 15.8067 8.00192 15.8067C9.08005 15.8067 10.1484 15.8165 11.2246 15.7559C12.4746 15.6954 13.584 15.4102 14.498 14.4962C15.414 13.5802 15.6972 12.4727 15.7578 11.2227C15.8203 10.1466 15.8086 9.07822 15.8086 8.00009ZM7.99997 12.0059C5.78317 12.0059 3.99411 10.2169 3.99411 8.00009C3.99411 5.78329 5.78317 3.99423 7.99997 3.99423C10.2168 3.99423 12.0058 5.78329 12.0058 8.00009C12.0058 10.2169 10.2168 12.0059 7.99997 12.0059ZM12.1699 4.76572C11.6523 4.76572 11.2343 4.34775 11.2343 3.83017C11.2343 3.31259 11.6523 2.89462 12.1699 2.89462C12.6875 2.89462 13.1054 3.31259 13.1054 3.83017C13.1056 3.95307 13.0815 4.0748 13.0345 4.18837C12.9876 4.30195 12.9187 4.40514 12.8318 4.49205C12.7449 4.57895 12.6417 4.64786 12.5281 4.69482C12.4145 4.74178 12.2928 4.76587 12.1699 4.76572Z"
                    fill="white"
                />
            </svg>
        </div>
        <!--  dinning-table-icon' -->
        <div class="icon-customer" v-if="IconChosen === 'dinning-table-icon'">
            <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 67.17"
            >
                <title>dining-table</title>
                <path
                    class="cls-1"
                    fill="#ffffff"
                    d="M36.62,15.45a.5.5,0,0,0,.21.05H57.34v48h-1a1.87,1.87,0,0,0-1.86,1.86h0a1.87,1.87,0,0,0,1.86,1.86h12a1.86,1.86,0,0,0,1.85-1.86h0a1.86,1.86,0,0,0-1.85-1.86h-1V15.5H86.05a.59.59,0,0,0,.22-.05h2a4.53,4.53,0,0,0,4.52-4.52h0a4.53,4.53,0,0,0-4.52-4.52H34.66a4.53,4.53,0,0,0-4.52,4.52h0a4.53,4.53,0,0,0,4.52,4.52ZM1.74,0H6.33A1.83,1.83,0,0,1,8,1.7a203.24,203.24,0,0,1,2.62,32.76H42a2.25,2.25,0,0,1,2.25,2.25v4.54h-1.8V64.49a.69.69,0,0,1-.68.68h-6a.68.68,0,0,1-.69-.68V54.38H9.41Q8.85,59,8,63.63a1.84,1.84,0,0,1-1.7,1.7H1.74c-.93,0-2-.81-1.7-1.7,6-21,4.78-41.6,0-61.93C-.17.79.81,0,1.74,0ZM35.07,51.25v-10H10.55c-.13,4.25-.43,5.75-.88,10ZM121.14,0h-4.59a1.83,1.83,0,0,0-1.7,1.7,203.24,203.24,0,0,0-2.62,32.76H80.88a2.25,2.25,0,0,0-2.25,2.25v4.54h1.8V64.49a.69.69,0,0,0,.68.68h6a.68.68,0,0,0,.69-.68V54.38h25.66q.56,4.62,1.38,9.25a1.84,1.84,0,0,0,1.7,1.7h4.59c.93,0,2-.81,1.7-1.7-6-21-4.78-41.6,0-61.93.21-.91-.77-1.7-1.7-1.7ZM87.81,51.25v-10h24.52c.13,4.25.43,5.75.88,10Z"
                />
            </svg>
        </div>
        <!--  dinning-table-small-icon' -->
        <div class="icon-customer" v-if="IconChosen === 'dinning-table-small-icon'">
            <svg
                width="30"
                height="30"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 67.17"
            >
                <title>dining-table</title>
                <path
                    class="cls-1"
                    fill="#4f52ff"
                    d="M36.62,15.45a.5.5,0,0,0,.21.05H57.34v48h-1a1.87,1.87,0,0,0-1.86,1.86h0a1.87,1.87,0,0,0,1.86,1.86h12a1.86,1.86,0,0,0,1.85-1.86h0a1.86,1.86,0,0,0-1.85-1.86h-1V15.5H86.05a.59.59,0,0,0,.22-.05h2a4.53,4.53,0,0,0,4.52-4.52h0a4.53,4.53,0,0,0-4.52-4.52H34.66a4.53,4.53,0,0,0-4.52,4.52h0a4.53,4.53,0,0,0,4.52,4.52ZM1.74,0H6.33A1.83,1.83,0,0,1,8,1.7a203.24,203.24,0,0,1,2.62,32.76H42a2.25,2.25,0,0,1,2.25,2.25v4.54h-1.8V64.49a.69.69,0,0,1-.68.68h-6a.68.68,0,0,1-.69-.68V54.38H9.41Q8.85,59,8,63.63a1.84,1.84,0,0,1-1.7,1.7H1.74c-.93,0-2-.81-1.7-1.7,6-21,4.78-41.6,0-61.93C-.17.79.81,0,1.74,0ZM35.07,51.25v-10H10.55c-.13,4.25-.43,5.75-.88,10ZM121.14,0h-4.59a1.83,1.83,0,0,0-1.7,1.7,203.24,203.24,0,0,0-2.62,32.76H80.88a2.25,2.25,0,0,0-2.25,2.25v4.54h1.8V64.49a.69.69,0,0,0,.68.68h6a.68.68,0,0,0,.69-.68V54.38h25.66q.56,4.62,1.38,9.25a1.84,1.84,0,0,0,1.7,1.7h4.59c.93,0,2-.81,1.7-1.7-6-21-4.78-41.6,0-61.93.21-.91-.77-1.7-1.7-1.7ZM87.81,51.25v-10h24.52c.13,4.25.43,5.75.88,10Z"
                />
            </svg>
        </div>
        <!--  check-icon -->
        <div class="icon-customer" v-if="IconChosen === 'check-icon'">
            <svg
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        </div>
        <!--  x-icon -->
        <div class="icon-customer" v-if="IconChosen === 'x-icon'">
            <svg
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>
        <!--  logout-icon -->
        <div class="icon-customer" v-if="IconChosen === 'logout-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
        </div>
        <!-- currency-dollar-icon -->
        <div class="icon-customer" v-if="IconChosen === 'currency-dollar-icon'">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <!--  bill-icon -->
        <div class="icon-customer" v-if="IconChosen === 'bill-icon'">
            <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96.41 122.88"
            >
                <title>bill</title>
                <path
                    fill="#ffffff"
                    d="M65.07,122.88H5.46a5.45,5.45,0,0,1-3.85-1.61A5.36,5.36,0,0,1,0,117.42V5.45A5.35,5.35,0,0,1,1.61,1.61,5.36,5.36,0,0,1,5.46,0H90.87a5.48,5.48,0,0,1,5.45,5.45V91.12a3.1,3.1,0,0,1,.09.61,2.58,2.58,0,0,1-.83,1.86l-28.17,28.5a3.77,3.77,0,0,1-2.34.79ZM27,87.25a12.91,12.91,0,0,1,9.17,3.8l.07.07A13,13,0,1,1,27,87.25Zm0,6.08a6.89,6.89,0,1,1-6.88,6.88A6.89,6.89,0,0,1,27,93.33Zm7.35-.46a10.28,10.28,0,1,0,.06.06l-.06-.06ZM14.88,13.29H29.49a.84.84,0,0,1,.84.84V27.45a.85.85,0,0,1-.84.84H14.88a.85.85,0,0,1-.84-.84V14.13a.84.84,0,0,1,.84-.84ZM78.7,28.1H69.34V13.48H74V24.36H78.7V28.1Zm-11,0H58.35V13.48H63V24.36h4.68V28.1ZM51,28.1V13.48h4.68V28.1Zm-14.2,0V13.48h7.58a4.41,4.41,0,0,1,3,.82,3,3,0,0,1,.9,2.38,4.22,4.22,0,0,1-.58,2.42,2.65,2.65,0,0,1-1.53,1.12v.14C48.05,20.68,49,22,49,24.21A4.13,4.13,0,0,1,48.06,27a3.66,3.66,0,0,1-2.88,1.07Zm6.51-5.83H41.46v2.39h1.8c.66,0,1-.4,1-1.19s-.32-1.2-1-1.2Zm-.36-5.59H41.46v2.18h1.45c.59,0,.89-.36.89-1.09s-.29-1.09-.87-1.09ZM23.52,45.85a1.76,1.76,0,0,1,0-3.51H58.64a1.76,1.76,0,0,1,0,3.51Zm0,26.88a1.75,1.75,0,1,1,0-3.5H72a1.75,1.75,0,0,1,0,3.5Zm0-10.7a1.75,1.75,0,1,1,0-3.5H58.64a1.75,1.75,0,0,1,0,3.5Zm55.8-8.43H17.09V77.54H79.32V53.6ZM17.09,50.1H79.32V37.59H17.09V50.1Zm-1.75-16H81.07a1.75,1.75,0,0,1,1.75,1.75V79.29A1.75,1.75,0,0,1,81.07,81H15.34a1.75,1.75,0,0,1-1.75-1.75V35.83a1.75,1.75,0,0,1,1.75-1.75ZM63,118V96.65a7.37,7.37,0,0,1,7.4-7.4H91.34V5.45a.47.47,0,0,0-.18-.4.52.52,0,0,0-.39-.18H5.41a.47.47,0,0,0-.4.18.63.63,0,0,0-.17.4v112a.41.41,0,0,0,.17.4.55.55,0,0,0,.4.17H63Zm4.89-21.33v17.87L88,94.14H70.4a2.64,2.64,0,0,0-1.77.74,2.52,2.52,0,0,0-.74,1.77Z"
                />
            </svg>
        </div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
        <!--  icon -->
        <div class="icon-customer" v-if="IconChosen === '-icon'"></div>
    </div>
</template>

<script>
export default {
    name: 'comp-icon',
    props: {
        iconName: {
            type: String,
        },
    },
    data() {
        return {
            IconChosen: this.iconName,
        };
    },
};
</script>

<style lang="scss" scpoed>
.icon-customer {
    :hover {
        cursor: pointer;
    }
}
</style>
