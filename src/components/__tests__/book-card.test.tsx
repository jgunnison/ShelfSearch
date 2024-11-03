import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../book-card';

const book = {
    id: '1',
    title: 'Test Book',
    authors: ['Author One', 'Author Two'],
    thumbnail: 'https://via.placeholder.com/150',
};

test('renders BookCard component', () => {
    render(
        <BrowserRouter>
            <BookCard book={book} />
        </BrowserRouter>,
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author One, Author Two')).toBeInTheDocument();
    expect(screen.getByAltText('Test Book')).toBeInTheDocument();
});
