const fetchBook = async (bookId: string) => {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${
            import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
        }`,
    );
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
};

export default fetchBook;
