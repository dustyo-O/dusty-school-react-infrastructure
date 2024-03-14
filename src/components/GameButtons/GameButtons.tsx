import React from 'react';
import type { FC } from 'react';
import { Button, CubeIcon, CutIcon, DocumentIcon } from 'evergreen-ui';

import { cnGameButtons } from './GameButtons.classname';

type GameButtonsProps = {
    onMove: (move: 'rock' | 'scissors' | 'paper') => void;
};

const GameButtons: FC<GameButtonsProps> = ({ onMove }) => {
    const handleRock = () => {
        onMove('rock');
    };

    const handleScissors = () => {
        onMove('scissors');
    };

    const handlePaper = () => {
        onMove('paper');
    };

    return <div className={cnGameButtons()}>
        <Button iconBefore={CubeIcon} size="large" onClick={handleRock}>Камень</Button>
        <Button iconBefore={CutIcon} size="large" onClick={handleScissors}>Ножницы</Button>
        <Button iconBefore={DocumentIcon} size="large" onClick={handlePaper}>Бумага</Button>
    </div>;
}

export { GameButtons };
