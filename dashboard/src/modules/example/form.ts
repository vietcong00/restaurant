import { authService } from './services/api.service';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const initLoginForm = () => {
    const formValues = {
        email: 'user1@tokyotechlab.com',
        password: 'tt@1234',
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
