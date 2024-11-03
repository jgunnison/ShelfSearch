import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Reviews from '../reviews';

const bookId = '1';

beforeEach(() => {
    localStorage.clear();
});

describe('Reviews', () => {
    it('renders Reviews component', () => {
        render(<Reviews bookId={bookId} />);

        expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Add a review')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('loads reviews from localStorage', () => {
        localStorage.setItem(
            `reviews-${bookId}`,
            JSON.stringify([
                {
                    text: 'Great book!',
                    reviewer: 'John Doe',
                    timestamp: '2023-10-01 10:00:00',
                },
            ]),
        );
        render(<Reviews bookId={bookId} />);

        expect(screen.getByText('Great book!')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('2023-10-01 10:00:00')).toBeInTheDocument();
    });

    it('adds a new review', () => {
        render(<Reviews bookId={bookId} />);

        const nameInput = screen.getByPlaceholderText('Your Name');
        const reviewInput = screen.getByPlaceholderText('Add a review');
        const button = screen.getByText('Submit');

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(reviewInput, { target: { value: 'Amazing read!' } });
        fireEvent.click(button);

        expect(screen.getByText('Amazing read!')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(localStorage.getItem(`reviews-${bookId}`)).toContain(
            'Amazing read!',
        );
    });

    it('shows an error message if fields are empty', () => {
        render(<Reviews bookId={bookId} />);

        const button = screen.getByText('Submit');
        fireEvent.click(button);

        expect(
            screen.getByText('Both fields are required.'),
        ).toBeInTheDocument();
    });

    it('clears input fields after adding a review', () => {
        render(<Reviews bookId={bookId} />);

        const nameInput = screen.getByPlaceholderText('Your Name');
        const reviewInput = screen.getByPlaceholderText('Add a review');
        const button = screen.getByText('Submit');

        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(reviewInput, { target: { value: 'Must read!' } });
        fireEvent.click(button);

        expect(nameInput).toHaveValue('');
        expect(reviewInput).toHaveValue('');
    });
});
