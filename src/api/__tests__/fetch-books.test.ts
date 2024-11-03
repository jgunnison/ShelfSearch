import { describe, it, expect, vi } from 'vitest';
import fetchBooks from '../fetch-books';

const mockBooks = {
    items: [
        {
            id: '1',
            volumeInfo: {
                title: 'Test Book 1',
                authors: ['Author One'],
                description: 'This is a test description of the first book.',
                imageLinks: {
                    thumbnail: 'https://via.placeholder.com/150',
                },
            },
        },
        {
            id: '2',
            volumeInfo: {
                title: 'Test Book 2',
                authors: ['Author Two'],
                description: 'This is a test description of the second book.',
                imageLinks: {
                    thumbnail: 'https://via.placeholder.com/150',
                },
            },
        },
    ],
};

describe('fetchBooks', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('fetches books data successfully', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockBooks),
            }),
        ) as unknown as jest.Mock;

        const query = 'test';
        const result = await fetchBooks(query);

        expect(result).toEqual(mockBooks.items);
        expect(global.fetch).toHaveBeenCalledWith(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
        );
    });

    it('returns an empty array when no items are found', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            }),
        ) as unknown as jest.Mock;

        const query = 'test';
        const result = await fetchBooks(query);

        expect(result).toEqual([]);
        expect(global.fetch).toHaveBeenCalledWith(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
        );
    });

    it('throws an error when the network response is not ok', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
            }),
        ) as unknown as jest.Mock;

        const query = 'test';
        await expect(fetchBooks(query)).rejects.toThrow(
            'Network response was not ok',
        );
        expect(global.fetch).toHaveBeenCalledWith(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`,
        );
    });
});
