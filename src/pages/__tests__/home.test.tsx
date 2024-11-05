import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import HomePage from '../home';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useSearchParams: vi.fn(),
        Link: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ),
    };
});

vi.mock('@tanstack/react-query', () => ({
    ...vi.importActual('@tanstack/react-query'),
    useQuery: vi.fn(),
}));

const mockBooks = [
    {
        id: '1',
        volumeInfo: {
            title: 'Test Book 1',
            authors: ['Author One'],
            imageLinks: {
                thumbnail: 'https://via.placeholder.com/150',
            },
        },
    },
    {
        id: '2',
        volumeInfo: {
            title: 'Test Book 2',
            authors: ['Author Two'],
            imageLinks: {
                thumbnail: 'https://via.placeholder.com/150',
            },
        },
    },
];

describe('HomePage', () => {
    it('renders loading state initially', () => {
        (useSearchParams as Mock).mockReturnValue([
            new URLSearchParams({ q: 'test' }),
            vi.fn(),
        ]);
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
        });

        render(<HomePage />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useSearchParams as Mock).mockReturnValue([
            new URLSearchParams({ q: 'test' }),
            vi.fn(),
        ]);
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: new Error('Network response was not ok'),
            isLoading: false,
        });

        render(<HomePage />);

        expect(screen.getByText('Error loading books')).toBeInTheDocument();
    });

    it('renders book cards after fetching book data', () => {
        (useSearchParams as Mock).mockReturnValue([
            new URLSearchParams({ q: 'test' }),
            vi.fn(),
        ]);
        (useQuery as Mock).mockReturnValue({
            data: mockBooks,
            error: undefined,
            isLoading: false,
        });

        render(<HomePage />);

        expect(screen.getByText('Test Book 1')).toBeInTheDocument();
        expect(screen.getByText('Author One')).toBeInTheDocument();
        expect(screen.getByText('Test Book 2')).toBeInTheDocument();
        expect(screen.getByText('Author Two')).toBeInTheDocument();
    });

    it('renders the search bar', () => {
        (useSearchParams as Mock).mockReturnValue([
            new URLSearchParams({ q: '' }),
            vi.fn(),
        ]);
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false,
        });

        render(<HomePage />);

        expect(
            screen.getByPlaceholderText('Search for books...'),
        ).toBeInTheDocument();
    });

    it('calls handleChange when input value changes', () => {
        const mockSetSearchParams = vi.fn();
        (useSearchParams as Mock).mockReturnValue([
            new URLSearchParams({ q: '' }),
            mockSetSearchParams,
        ]);
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: false,
        });

        render(<HomePage />);

        const input = screen.getByPlaceholderText('Search for books...');
        fireEvent.change(input, { target: { value: 'New query' } });

        expect(mockSetSearchParams).toHaveBeenCalled();
    });
});
