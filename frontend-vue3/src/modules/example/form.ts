import { authService } from './services/api.service';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { productStore } from './store';

export const initLoginForm = () => {
    const formValues = {
        email: 'tientung@gmail.com',
        password: '123456',
        // email: '',
        // password: '',
    };

    const { handleSubmit, isSubmitting } = useForm({
        initialValues: formValues,
    });

    const onSubmit = handleSubmit(async (form) => {
        await authService.Login(form);
    });

    const { value: email, errorMessage: emailError } = useField(
        'email',
        yup.string().email().required(),
    );
    const { value: password, errorMessage: passwordError } = useField(
        'password',
        yup.string().required().min(6),
    );

    return {
        onSubmit,
        isSubmitting,
        email,
        password,
        emailError,
        passwordError,
    };
};

export const initBookingForm = () => {
    const formValues = {
        numberPeople: 1,
        nameCustomer: '',
        phone: '',
        idRestaurant: 0,
        arrivalTime: '',
    };

    const { handleSubmit, isSubmitting } = useForm({
        initialValues: formValues,
    });

    const onSubmit = handleSubmit(async (form) => {
        let date = new Date(form.arrivalTime);
        const formBooking = {
            numberPeople: productStore.getNumberPeople,
            nameCustomer: form.nameCustomer,
            phone: form.phone,
            idRestaurant: productStore.getIdRestaurant,
            arrivalTime: date.getTime() / 1000,
        };
        await productStore.postBooking(formBooking);
    });

    const { value: nameCustomer, errorMessage: nameCustomerError } = useField(
        'nameCustomer',
        yup.string().required(),
    );

    const { value: phone, errorMessage: phoneError } = useField(
        'phone',
        yup.string().required().min(6),
    );

    const { value: numberPeople, errorMessage: numberPeopleError } = useField(
        'numberPeople',
        yup.string().required(),
    );

    const { value: branch, errorMessage: branchError } = useField(
        'branch',
        yup.string().required(),
    );

    const { value: arrivalTime, errorMessage: arrivalTimeError } = useField(
        'arrivalTime',
        yup.string().required(),
    );

    return {
        onSubmit,
        isSubmitting,
        nameCustomer,
        phone,
        numberPeople,
        branch,
        arrivalTime,
        nameCustomerError,
        phoneError,
        numberPeopleError,
        branchError,
        arrivalTimeError,
    };
};
