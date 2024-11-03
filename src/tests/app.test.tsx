import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import App from '../app';

describe('App', () => {
    const queryClient = new QueryClient();

    it('renders HomePage component for the root route', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>,
        );

        expect(
            screen.getByPlaceholderText('Search for books...'),
        ).toBeInTheDocument();
    });

    it('renders BookPage component for the /book/:bookId route', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>,
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
