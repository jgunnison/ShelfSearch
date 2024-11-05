import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchBooks from '../api/fetch-books';
import SearchBar from '../components/search-bar';
import BookCard from '../components/book-card';
import useDebounce from '../hooks/use-debounce';

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail?: string;
        };
    };
}

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams({ q: '' });
    const query = searchParams.get('q') ?? '';

    const [searchQuery, setSearchQuery] = useState<string>(query);
    const debouncedQuery = useDebounce(searchQuery, 500);

    const {
        data: books,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['books', debouncedQuery],
        queryFn: () => fetchBooks(debouncedQuery),
        enabled: !!debouncedQuery,
        staleTime: Infinity,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({ q: e.target.value }, { replace: true });
    };

    const handleSearch = () => {
        setSearchQuery(query);
    };

    if (isLoading) {
        return (
            <>
                <SearchBar
                    query={query}
                    onChange={(e) => handleChange(e)}
                    onSearch={handleSearch}
                />
                <div className="mt-4 text-center text-xl">Loading...</div>
            </>
        );
    }
    if (error) {
        return (
            <>
                <SearchBar
                    query={query}
                    onChange={(e) => handleChange(e)}
                    onSearch={handleSearch}
                />
                <div className="mt-4 text-center text-xl">
                    Error loading books
                </div>
            </>
        );
    }

    return (
        <>
            <SearchBar
                query={query}
                onChange={(e) => handleChange(e)}
                onSearch={handleSearch}
            />
            <div className="mt-4 flex flex-wrap justify-center gap-4">
                {books?.map((book: Book) => (
                    <BookCard
                        key={book.id}
                        book={{
                            id: book.id,
                            title: book.volumeInfo.title,
                            authors: book.volumeInfo.authors || [],
                            thumbnail:
                                book.volumeInfo.imageLinks?.thumbnail || '',
                        }}
                    />
                ))}
            </div>
        </>
    );
}
