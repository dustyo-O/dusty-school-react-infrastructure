import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Heading, Spinner, toaster } from 'evergreen-ui';

import type { User } from '../../types/User';
import type { PlayerListResponse, PlayerStatusResponse } from '../../types/api';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { cnPageLogin } from './PageLogin.classname';

import './PageLogin.css';

type PageLoginProps = {
    onLogin: (user: User) => void;
};

const PageLogin: FC<PageLoginProps> = ({ onLogin }) => {
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const storageToken = localStorage.getItem('token');

        if (!storageToken) {
            setChecking(false);

            return;
        }

        fetch('http://localhost:3000/player-status?token=' + storageToken)
            .then(response => response.json())
            .then((result: PlayerStatusResponse) => {
                if (result.status === 'error') {
                    localStorage.removeItem('token');

                    return;
                }

                return fetch('http://localhost:3000/player-list?token=' + storageToken)
                    .then(response => response.json())
                    .then((result: PlayerListResponse) => {
                        const player = result.list.find(player => player.you === true);

                        if (player === undefined) {
                            setChecking(false);

                            localStorage.removeItem('token');
                        } else {
                            onLogin({ token: storageToken, login: player.login });
                        }
                    });
            })
            .catch(() => {
                toaster.danger('Ошибка запроса');
            })
            .finally(() => {
                setChecking(false);
            });
    }, []);

    return (
        <div className={cnPageLogin()}>
            <Heading size={600}>Камень, ножницы, бумага</Heading>
            {checking ? <Spinner /> : <LoginForm onLogin={onLogin} />}
        </div>
    );
}

export { PageLogin };
