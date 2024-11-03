interface SearchBarProps {
    query: string;
    onSearch: (query: string) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch, onChange }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex">
            <label htmlFor="search-input" className="sr-only">
                Search for books
            </label>
            <input
                id="search-input"
                type="text"
                placeholder="Search for books..."
                className="w-full rounded-l-lg border border-green-700 px-4 py-2"
                value={query}
                onChange={onChange}
                maxLength={80}
            />
            <button
                type="submit"
                className="rounded-r-lg bg-green-700 px-6 py-4 font-bold text-white hover:bg-green-900"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
