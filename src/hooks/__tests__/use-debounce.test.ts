import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useDebounce from '../use-debounce';

describe('useDebounce', () => {
    vi.useFakeTimers();

    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));
        expect(result.current).toBe('initial');
    });

    it('should debounce the value', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            },
        );
        rerender({ value: 'updated', delay: 500 });
        expect(result.current).toBe('initial');
        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(result.current).toBe('updated');
    });

    it('should clear the timeout on unmount', () => {
        const { result, unmount } = renderHook(() =>
            useDebounce('initial', 500),
        );

        act(() => {
            vi.advanceTimersByTime(250);
        });

        unmount();

        expect(result.current).toBe('initial');
    });
});
