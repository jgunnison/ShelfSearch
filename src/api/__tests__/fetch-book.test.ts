import { describe, it, expect, Mock, vi } from 'vitest';
import fetchBook from '../fetch-book';

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

describe('fetchBook', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('fetches book data successfully', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockBook),
            }),
        ) as Mock;

        const bookId = '1';
        const result = await fetchBook(bookId);

        expect(result).toEqual(mockBook);
        expect(global.fetch).toHaveBeenCalledWith(
            `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
        );
    });

    it('throws an error when the network response is not ok', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
            }),
        ) as Mock;

        const bookId = '1';

        await expect(fetchBook(bookId)).rejects.toThrow(
            'Network response was not ok',
        );
        expect(global.fetch).toHaveBeenCalledWith(
            `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
        );
    });
});
