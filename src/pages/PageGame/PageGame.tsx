import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { Button, Heading, Spinner } from 'evergreen-ui';

import { Enemy, GameStatusResponse, PlayResponse } from '../../types/api';
import { GameButtons } from '../../components/GameButtons/GameButtons';
import { cnPageGame } from './PageGame.classname';
import { apiURL } from '../../lib/url';

import './PageGame.css';

type GameStatus = GameStatusResponse['game-status']['status'];

type PageGameProps = {
    token: string;
    gameId: string | undefined;
    onFinish: () => void;
};

const PageGame: FC<PageGameProps> = ({ token, gameId, onFinish }) => {
    const [gameStatus, setGameStatus] = useState<GameStatus | undefined>(undefined);
    const [enemy, setEnemy] = useState<Enemy | undefined>(undefined);
    const timer = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (gameStatus !== undefined) {
            return;
        }

        if (gameId === undefined) {
            return;
        }

        fetch(apiURL('game-status', { token, id: gameId }))
            .then(response => response.json())
            .then((result: GameStatusResponse) => {
                setGameStatus(result['game-status'].status);

                if (result['game-status'].status !== 'waiting-for-start') {
                    setEnemy(result['game-status'].enemy);
                }
            });
    }, [gameId, gameStatus, token]);

    useEffect(() => {
        if (gameStatus !== 'waiting-for-start' && gameStatus !== 'waiting-for-enemy-move') {
            return;
        }

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setGameStatus(undefined);

            timer.current = undefined;
        }, 3000);

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [gameStatus]);

    const handleMove = (move: 'rock' | 'scissors' | 'paper') => {
        if (gameId === undefined) {
            return;
        }

        fetch(apiURL('play', { token, id: gameId, move }))
            .then(response => response.json())
            .then((result: PlayResponse) => {
                if (result.status === 'error') {
                    window.location.reload();

                    return;
                }

                setGameStatus(result['game-status'].status);
            });
    };

    return (
        <div className={cnPageGame()}>
            <Heading size={600}>Игра{enemy ? ' c ' + enemy.login : ''}</Heading>
            {(gameStatus === 'waiting-for-enemy-move' || gameStatus === 'waiting-for-start' || gameStatus === undefined) && <>
                <Heading size={500}>Ожидание {enemy ? 'хода ': ''}соперника...</Heading>
                <Spinner size={100} />
            </>}
            {gameStatus === 'waiting-for-your-move' && <GameButtons onMove={handleMove} />}
            {gameStatus === 'win' && <Heading size={500}>Победа!</Heading>}
            {gameStatus === 'lose' && <Heading size={500}>Проиграли</Heading>}
            {(gameStatus === 'lose' || gameStatus === 'win')
                && <Button appearance="primary" onClick={onFinish}>В лобби</Button>}
        </div>
    );
}

export { PageGame };
