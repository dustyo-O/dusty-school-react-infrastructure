import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

import { Player, PlayerListResponse } from '../../types/api';
import { cnPlayerList } from './PlayerList.classname';

import './PlayerList.css';
import { Heading, Spinner } from 'evergreen-ui';

type PlayerListProps = {
    token: string;
};

const PlayerList: FC<PlayerListProps> = ({ token }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const timer = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (timer.current) {
            return;
        }

        timer.current = setInterval(() => {
            fetch('http://localhost:3000/player-list?token=' + token)
                .then(response => response.json())
                .then((result: PlayerListResponse) => {
                    setPlayers(result.list);
                });
        }, 3000);

        return () => {
            clearInterval(timer.current);
        }
    }, [token]);

    return (
        <div className={cnPlayerList()}>
            {players.length === 0 ?
                <Spinner /> :
                players.map(player => <Heading size={200}>{player.login}</Heading>)
            }
        </div>
    );
}

export { PlayerList };
