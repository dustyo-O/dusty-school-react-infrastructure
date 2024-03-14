import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameButtons } from './GameButtons';

const handler = jest.fn();

beforeEach(() => {
    jest.restoreAllMocks();
});

test('Can make rock move', () => {
    render(<GameButtons onMove={handler} />);

    const rockButton = screen.getByText(/Камень/i);

    fireEvent.click(rockButton);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith('rock');
});

test('Can make scissors move', () => {
    render(<GameButtons onMove={handler} />);

    const rockButton = screen.getByText(/Ножницы/i);

    fireEvent.click(rockButton);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith('scissors');
});

test('Can make paper move', () => {
    render(<GameButtons onMove={handler} />);

    const rockButton = screen.getByText(/Бумага/i);

    fireEvent.click(rockButton);

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith('paper');
});
