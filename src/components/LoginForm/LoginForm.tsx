import React, { useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { Button, Heading, TextInput, toaster } from 'evergreen-ui';

import type { User } from '../../types/User';
import { LoginResponse } from '../../types/api';
import { cnLoginForm } from './LoginForm.classname';

import './LoginForm.css';

type LoginFormProps = {
    onLogin: (user: User) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        fetch('http://localhost:3000/login?login=' + login)
            .then(response => response.json())
            .then((result: LoginResponse) => {
                if (result.status === 'ok') {
                    const token = result.token;

                    onLogin({
                        login,
                        token
                    });
                } else {
                    toaster.danger('Что-то пошло не так, попробуйте еще раз');
                }
            })
            .catch(() => {
                toaster.danger('Ошибка запроса');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form className={cnLoginForm()} onSubmit={handleFormSubmit}>
            <Heading size={300}>Никнейм</Heading>
            <TextInput
                className={cnLoginForm('Input')}
                value={login}
                disabled={loading}
                onChange={handleLoginChange}
            />
            <Button
                className={cnLoginForm('Button')}
                disabled={login === '' || loading}
                isLoading={loading}
                appearance="primary"
            >
                Войти
            </Button>
        </form>
    );
}

export { LoginForm };
