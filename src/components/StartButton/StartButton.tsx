import React, { useState } from 'react';
import type { FC } from 'react';
import { Button, toaster } from 'evergreen-ui';

import { PlayerStatusResponse, StartGameResponse } from '../../types/api';
import { cnStartButton } from './StartButton.classname';
import { apiURL } from '../../lib/url';

import './StartButton.css';


type StartButtonProps = {
    token: string;
    onStart: (id: string) => void;
};

const StartButton: FC<StartButtonProps> = ({ token, onStart }) => {
    const [loading, setLoading] = useState(false);

    const handleStart = () => {
        setLoading(true);

        fetch(apiURL('start', { token }))
            .then(response => response.json())
            .then((result: StartGameResponse) => {
                if (result.status === 'ok') {
                    onStart(result['player-status'].game.id);

                    return;
                }

                if (result.message === 'player is already in game') {
                    fetch(apiURL('player-status', { token }))
                        .then(response => response.json())
                        .then((statusResponse: PlayerStatusResponse) => {
                            if (statusResponse.status === 'ok') {
                                if (statusResponse['player-status'].status === 'game') {
                                    onStart(statusResponse['player-status'].game.id);

                                    return;
                                }
                            }

                            window.location.reload();
                        });
                }

                if (result.message === 'token doesn\'t exist') {
                    window.location.reload();
                }
            })
            .catch((error) => {
                toaster.danger('Ошибка запроса ' + error?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className={cnStartButton()}>
            <Button
                className={cnStartButton('Button')}
                disabled={loading}
                isLoading={loading}
                appearance="primary"
                onClick={handleStart}
            >
                Начать игру!
            </Button>
        </div>
    );
}

export { StartButton };
