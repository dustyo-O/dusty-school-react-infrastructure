import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LoginForm } from './LoginForm';

const handler = jest.fn();

beforeEach(() => {
    jest.restoreAllMocks();

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ status: 'ok', token: '123' }),
        }),
    ) as jest.Mock;
});

test('Login scenario', async () => {
    render(<LoginForm onLogin={handler} />);

    const enterButton = screen.getByText(/Войти/i);

    expect(enterButton).toBeInTheDocument();
    expect(enterButton).toBeDisabled();

    const loginInput = screen.getByPlaceholderText(/dusty/i);

    expect(loginInput).toBeInTheDocument();
    fireEvent.change(loginInput, { target: { value: 'tester' }});

    expect(enterButton).not.toBeDisabled();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => fireEvent.click(enterButton));

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith({ login: 'tester', token: '123' });
});
