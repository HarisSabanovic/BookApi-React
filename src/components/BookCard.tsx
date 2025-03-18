
interface BookCardProps {
    book: any;
    onSelect: (book: any) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
    const { title, authors, publishedDate, imageLinks } = book.volumeInfo;

    return (
        <div 
            key={book.id} 
            onClick={() => onSelect(book)} >
            {imageLinks && (
                <img 
                    src={imageLinks.thumbnail} 
                    alt={title} 
                    style={{ width: "100px", borderRadius: "4px" }}
                />
            )}
            <div>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <p><strong>Författare:</strong> {authors?.join(", ") || "Okänd författare"}</p>
                <p><strong>Publiceringsår:</strong> {publishedDate || "Okänt år"}</p>
            </div>
        </div>
    );
};

export default BookCard