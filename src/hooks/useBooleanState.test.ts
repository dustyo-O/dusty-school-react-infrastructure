import { act, renderHook } from '@testing-library/react';
import { useBooleanState } from './useBooleanState';

test('Returns initialValue on first call', () => {

    const { result } = renderHook(() => useBooleanState(true));

    expect(result.current[0]).toBe(true);
});

test('Turns true if call first function', () => {
    const { result } = renderHook(() => useBooleanState(false));

    const [_, setTrue] = result.current;

    act(() => setTrue());

    expect(result.current[0]).toBe(true);
});

test('Turns false if call second function', () => {
    const { result } = renderHook(() => useBooleanState(true));

    const [_, __, setFalse] = result.current;

    act(() => setFalse());

    expect(result.current[0]).toBe(false);
});

test('Turns to passed value if call last function', () => {
    const { result } = renderHook(() => useBooleanState(true));

    const [_, __, ___, setValue] = result.current;

    act(() => setValue(false));

    expect(result.current[0]).toBe(false);
});
