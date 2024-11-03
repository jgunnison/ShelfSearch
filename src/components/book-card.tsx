import { Link } from 'react-router-dom';

interface Book {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <Link
            className="w-64 rounded-lg bg-white p-4 drop-shadow-md"
            to={`/book/${book.id}`}
        >
            <img
                src={book.thumbnail}
                alt={book.title}
                className="h-auto w-56 border"
            />
            <h2 className="mt-2 font-serif text-xl">{book.title}</h2>
            <p>{book.authors.join(', ')}</p>
        </Link>
    );
};

export default BookCard;
