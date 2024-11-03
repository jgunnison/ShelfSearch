import { render, screen } from '@testing-library/react';
import BookDetails from '../book-details';

const bookDetailsProps = {
    title: 'Test Book',
    authors: ['Author One', 'Author Two'],
    description: 'This is a test description of the book.',
    thumbnail: 'https://via.placeholder.com/150',
};

test('renders BookDetails component', () => {
    render(<BookDetails {...bookDetailsProps} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('By: Author One, Author Two')).toBeInTheDocument();
    expect(
        screen.getByText('This is a test description of the book.'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Test Book')).toBeInTheDocument();
});
