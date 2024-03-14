type LoginOkResponse = {
    status: 'ok';
    token: string;
};

type LoginErrorResponse = {
    status: 'error';
};

export type LoginResponse = LoginOkResponse | LoginErrorResponse;

type PlayerStatusLobbyResponse = {
    status: 'ok';
    'player-status': {
        status: 'lobby';
    };
};

type PlayerGameStatus = {
    status: 'game';
    game: {
        id: string;
    };
};

type PlayerStatusGameResponse = {
    status: 'ok';
    'player-status': PlayerGameStatus;
};

type PlayerStatusErrorResponse = {
    status: 'error';
};

export type PlayerStatusResponse =
    | PlayerStatusLobbyResponse
    | PlayerStatusGameResponse
    | PlayerStatusErrorResponse
;

export type Player = {
    login: string;
    wins: number;
    loses: number;
    rocks: number;
    papers: number;
    scissors: number;
    you?: true;
};

export type Enemy = Omit<Player, 'you'>;

export type PlayerListResponse = {
    status: 'ok';
    list: Player[];
};

type StartGameOkResponse = {
    status: 'ok';
    'player-status': PlayerGameStatus;
};

type StartGameAlreadyInGameResponse = {
    status: 'error';
    message: "player is already in game";
};

type StartGameErrorResponse = {
    status: 'error';
    message: "token doesn't exist";
};

export type StartGameResponse =
    | StartGameOkResponse
    | StartGameAlreadyInGameResponse
    | StartGameErrorResponse
;

type GameStatusWaitingForStartResponse = {
    status: 'ok';
    'game-status': {
        status: 'waiting-for-start';
    };
};

type GameStatusWaitingForYouMoveResponse = {
    status: 'ok';
    'game-status': {
        status: 'waiting-for-your-move';
        enemy: Enemy;
    };
};

type GameStatusWaitingForEnemyMoveResponse = {
    status: 'ok';
    'game-status': {
        status: 'waiting-for-enemy-move';
        enemy: Enemy;
    };
};

type GameStatusLoseResponse = {
    status: 'ok';
    'game-status': {
        status: 'lose';
        enemy: Enemy;
    };
};

type GameStatusWinResponse = {
    status: 'ok';
    'game-status': {
        status: 'win';
        enemy: Enemy;
    };
};

export type GameStatusResponse =
    | GameStatusWaitingForStartResponse
    | GameStatusWaitingForYouMoveResponse
    | GameStatusWaitingForEnemyMoveResponse
    | GameStatusLoseResponse
    | GameStatusWinResponse
;

type PlayErrorResponse = {
    status: 'error';
};

export type PlayResponse =
    | PlayErrorResponse
    | GameStatusWaitingForYouMoveResponse
    | GameStatusWaitingForEnemyMoveResponse
    | GameStatusLoseResponse
    | GameStatusWinResponse
;
