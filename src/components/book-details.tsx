import stripTags from '../utils/strip-tags';

interface BookDetailsProps {
    title: string;
    authors: string[];
    description: string;
    thumbnail: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({
    title,
    authors,
    description,
    thumbnail,
}) => {
    return (
        <>
            <div className="flex flex-col gap-x-4 rounded-lg border bg-white p-4 drop-shadow-md md:flex-row">
                <img
                    src={thumbnail}
                    alt={title}
                    className="h-96 w-64 flex-shrink-0 object-cover"
                />
                <div className="flex flex-col justify-center">
                    <h2 className="font-serif text-3xl font-bold">{title}</h2>
                    <p>By: {authors.join(', ')}</p>
                    <p className="mt-2">{stripTags(description)}</p>
                </div>
            </div>
        </>
    );
};

export default BookDetails;
