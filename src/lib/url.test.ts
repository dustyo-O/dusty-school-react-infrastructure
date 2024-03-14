import { apiURL } from './url';

test('makes ping url', () => {
    const url = apiURL('ping');

    expect(url).toBe('http://localhost:3000/ping');
});

test('makes player-list url', () => {
    const url = apiURL('player-list', { token: '111' });

    expect(url).toBe('http://localhost:3000/player-list?token=111');
});

test('makes game-status url', () => {
    const url = apiURL('game-status', { token: '111', id: '222' });

    expect(url).toBe('http://localhost:3000/game-status?token=111&id=222');
});

