import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import BookPage from '../book';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useParams: vi.fn(),
    useNavigate: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
    ...vi.importActual('@tanstack/react-query'),
    useQuery: vi.fn(),
}));

const mockBook = {
    id: '1',
    volumeInfo: {
        title: 'Test Book',
        authors: ['Author One', 'Author Two'],
        description: 'This is a test description of the book.',
        imageLinks: {
            thumbnail: 'https://via.placeholder.com/150',
        },
    },
};

describe('BookPage', () => {
    it('renders loading state initially', () => {
        (useParams as Mock).mockReturnValue({ bookId: '1' });
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
        });

        render(<BookPage />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useParams as Mock).mockReturnValue({ bookId: '1' });
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: new Error('Network response was not ok'),
            isLoading: false,
        });

        render(<BookPage />);

        expect(
            screen.getByText('Error loading book details'),
        ).toBeInTheDocument();
    });

    it('renders BookDetails and Reviews components after fetching book data', () => {
        (useParams as Mock).mockReturnValue({ bookId: '1' });
        (useQuery as Mock).mockReturnValue({
            data: mockBook,
            error: undefined,
            isLoading: false,
        });

        render(<BookPage />);

        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(
            screen.getByText('This is a test description of the book.'),
        ).toBeInTheDocument();
        expect(screen.getByAltText('Test Book')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Add a review')).toBeInTheDocument();
    });

    it('navigates back when the Back button is clicked', () => {
        const mockNavigate = vi.fn();
        (useParams as Mock).mockReturnValue({ bookId: '1' });
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        (useQuery as Mock).mockReturnValue({
            data: mockBook,
            error: undefined,
            isLoading: false,
        });

        render(<BookPage />);

        const backButton = screen.getByText('Back');
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
