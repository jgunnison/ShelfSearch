import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../search-bar';

describe('SearchBar', () => {
    const mockOnSearch = vi.fn();
    const mockOnChange = vi.fn();

    const setup = (query: string) => {
        render(
            <SearchBar
                query={query}
                onSearch={mockOnSearch}
                onChange={mockOnChange}
            />,
        );
    };

    it('renders SearchBar component', () => {
        setup('');

        expect(
            screen.getByPlaceholderText('Search for books...'),
        ).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('calls onSearch when search button is clicked', () => {
        setup('Test query');

        const button = screen.getByText('Search');
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalledWith('Test query');
    });

    it('calls onSearch when Enter key is pressed', () => {
        setup('Test query');

        const input = screen.getByPlaceholderText('Search for books...');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockOnSearch).toHaveBeenCalledWith('Test query');
    });
});
