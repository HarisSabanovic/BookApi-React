
interface BookCardProps {
    book: any;
    onSelect: (book: any) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
    const { title, authors, publishedDate, imageLinks } = book.volumeInfo;

    return (
        <div className="book-card" onClick={() => onSelect(book)}>
            <div className="book-card-image-wrapper">
                {imageLinks ? (
                    <img
                        src={imageLinks.thumbnail}
                        alt={title}
                        className="book-card-image"
                    />
                ) : (
                    <div className="book-card-placeholder">
                        Ingen bild
                    </div>
                )}
            </div>

            <div className="book-card-content">
                <h3 className="book-card-title">{title}</h3>

                <p className="book-card-author">
                    <span>Författare:</span> {authors?.join(", ") || "Okänd författare"}
                </p>

                <p className="book-card-year">
                    <span>Utgiven:</span> {publishedDate || "Okänt år"}
                </p>

                <button className="book-card-button">Visa mer</button>
            </div>
        </div>
    );
};

export default BookCard