import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container max-w-6xl">
                <header className="p-2 pt-6 text-center font-serif text-4xl font-bold text-green-700 drop-shadow-md">
                    Shelf Search
                </header>
                <main className="m-4 mb-8">
                    <Routes>
                        <Route path="/" element={<p>Home Page</p>} />
                        <Route
                            path="/book/:bookId"
                            element={<p>Book Page</p>}
                        />
                    </Routes>
                </main>
            </div>
        </QueryClientProvider>
    );
}
