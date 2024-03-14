import React, { useEffect, useState } from 'react';

import { PageLogin } from './pages/PageLogin/PageLogin';
import { PageLobby } from './pages/PageLobby/PageLobby';
import type { User } from './types/User';
import type { PlayerStatusResponse } from './types/api';
import { cnApp } from './App.classname';
import { PageGame } from './pages/PageGame/PageGame';
import { apiURL } from './lib/url';

import './App.css';

const App = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [room, setRoom] = useState<'lobby' | 'game' | undefined>(undefined);
    const [game, setGame] = useState<string | undefined>(undefined);

    const handleLogin = (loggedUser: User) => {
        localStorage.setItem('token', loggedUser.token);

        setUser(loggedUser);
    };

    useEffect(() => {
        if (!user) {
            return;
        }

        fetch(apiURL('player-status', { token: user.token }))
            .then(response => response.json())
            .then((result: PlayerStatusResponse) => {
                if (result.status === 'error') {
                    localStorage.removeItem('token');

                    setUser(undefined);
                    setRoom(undefined);

                    return;
                }

                setRoom(result['player-status'].status);

                if (result['player-status'].status === 'game') {
                    setGame(result['player-status'].game.id);
                }
            });
    }, [user]);

    const handleGameStart = (gameId: string) => {
        setRoom('game');
        setGame(gameId);
    };

    const handleFinish = () => {
        setRoom('lobby');
        setGame(undefined);
    };

    return (
        <div className={cnApp()}>
            {
                user ?
                    room === 'lobby' ?
                        <PageLobby token={user.token} onGameStart={handleGameStart} /> :
                        <PageGame token={user.token} gameId={game} onFinish={handleFinish} /> :
                    <PageLogin onLogin={handleLogin} />
            }
        </div>
    );
}

export { App };

