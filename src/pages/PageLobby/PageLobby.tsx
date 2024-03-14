import React from 'react';
import type { FC } from 'react';
import { Heading } from 'evergreen-ui';

import { StartButton } from '../../components/StartButton/StartButton';
import { PlayerList } from '../../components/PlayerList/PlayerList';
import { cnPageLobby } from './PageLobby.classname';

import './PageLobby.css';

type PageLobbyProps = {
    token: string;
    onGameStart: (id: string) => void;
};

const PageLobby: FC<PageLobbyProps> = ({ token, onGameStart }) => {
    return (
        <div className={cnPageLobby()}>
            <Heading size={600}>Лобби</Heading>
            <StartButton onStart={onGameStart} token={token} />
            <Heading size={500}>Игроки онлайн</Heading>
            <PlayerList token={token} />
        </div>
    );
}

export { PageLobby };
