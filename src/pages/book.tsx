import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { btnStyle } from '../styles/common-styles';
import fetchBook from '../api/fetch-book';
import BookDetails from '../components/book-details';
import Reviews from '../components/reviews';

export default function BookPage() {
    const navigate = useNavigate();
    const { bookId } = useParams<{ bookId: string }>();

    const {
        data: book,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => fetchBook(bookId!),
        enabled: !!bookId,
        staleTime: Infinity,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading book details</div>;

    return (
        <>
            <button className={`${btnStyle} mb-4`} onClick={() => navigate(-1)}>
                Back
            </button>
            <BookDetails
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors || []}
                description={book.volumeInfo.description || ''}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
            />
            <Reviews bookId={bookId!} />
        </>
    );
}
