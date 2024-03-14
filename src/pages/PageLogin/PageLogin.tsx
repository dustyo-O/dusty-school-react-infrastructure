import React, { useEffect } from 'react';
import type { FC } from 'react';
import { Heading, Spinner, toaster } from 'evergreen-ui';

import type { User } from '../../types/User';
import type { PlayerListResponse, PlayerStatusResponse } from '../../types/api';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { cnPageLogin } from './PageLogin.classname';
import { apiURL } from '../../lib/url';
import { useBooleanState } from '../../hooks/useBooleanState';

import './PageLogin.css';

type PageLoginProps = {
    onLogin: (user: User) => void;
};

const PageLogin: FC<PageLoginProps> = ({ onLogin }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [checking, _startChecking, finishChecking] = useBooleanState(true);

    useEffect(() => {
        const storageToken = localStorage.getItem('token');

        if (!storageToken) {
            finishChecking();

            return;
        }

        fetch(apiURL('player-status', { token: storageToken }))
            .then(response => response.json())
            .then((result: PlayerStatusResponse) => {
                if (result.status === 'error') {
                    localStorage.removeItem('token');

                    return;
                }

                return fetch(apiURL('player-list', { token: storageToken }))
                    .then(response => response.json())
                    .then((result: PlayerListResponse) => {
                        const player = result.list.find(player => player.you === true);

                        if (player === undefined) {
                            finishChecking();

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
                finishChecking();
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cnPageLogin()}>
            <Heading size={600}>Камень, ножницы, бумага</Heading>
            {checking ? <Spinner /> : <LoginForm onLogin={onLogin} />}
        </div>
    );
}

export { PageLogin };
