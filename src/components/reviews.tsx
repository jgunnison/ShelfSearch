import { useState, useEffect } from 'react';
import { btnStyle } from '../styles/common-styles';

interface Review {
    text: string;
    reviewer: string;
    timestamp: string;
}

interface ReviewsProps {
    bookId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState('');
    const [reviewer, setReviewer] = useState('');
    const [error, setError] = useState('');
    const reviewerMaxChars = 50;
    const reviewMaxChars = 250;

    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews-${bookId}`);
        if (storedReviews) setReviews(JSON.parse(storedReviews));
    }, [bookId]);

    const addReview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newReview.trim() || !reviewer.trim()) {
            setError('Both fields are required.');
            return;
        }
        setError('');
        const trimmedReviewer = reviewer.trim().substring(0, reviewerMaxChars);
        const trimmedReview = newReview.trim().substring(0, reviewMaxChars);
        const newReviewObject: Review = {
            text: trimmedReview,
            reviewer: trimmedReviewer,
            timestamp: new Date().toLocaleString(),
        };
        const updatedReviews = [...reviews, newReviewObject];
        setReviews(updatedReviews);
        localStorage.setItem(
            `reviews-${bookId}`,
            JSON.stringify(updatedReviews),
        );
        setNewReview('');
        setReviewer('');
    };

    return (
        <div className="mt-6">
            <h3 className="mb-2 text-xl font-bold">Reviews</h3>
            <div>
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="mb-2 rounded-lg border bg-white p-2"
                    >
                        <p className="font-bold">{review.reviewer}</p>
                        <p className="text-gray-500 text-sm">
                            {review.timestamp}
                        </p>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={addReview} className="mt-6">
                {error && <p className="text-red-500">{error}</p>}
                <label htmlFor="reviewer-input" className="sr-only">
                    Your Name
                </label>
                <input
                    id="reviewer-input"
                    type="text"
                    placeholder="Your Name"
                    value={reviewer}
                    onChange={(e) => setReviewer(e.target.value)}
                    className="mb-2 w-full rounded-lg border p-2"
                    maxLength={reviewerMaxChars}
                />
                <label htmlFor="review-input" className="sr-only">
                    Add a review
                </label>
                <textarea
                    id="review-input"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Add a review"
                    className="mb-2 w-full rounded-lg border p-2"
                    maxLength={reviewMaxChars}
                />
                <div className="text-gray-500 text-right text-sm">
                    {newReview.length}/{reviewMaxChars} characters
                </div>
                <button type="submit" className={`${btnStyle}`}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Reviews;
