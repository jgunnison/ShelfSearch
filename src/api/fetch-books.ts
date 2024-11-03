const fetchBooks = async (query: string) => {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${
            import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
        }`,
    );
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data.items || [];
};

export default fetchBooks;
