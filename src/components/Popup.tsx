import "../css/popup.css";
import {Book} from "../pages/HomePage";

interface Review {
    username: string;
    date: string;
    text: string;
}

interface PopupProps {
    book: Book;
    onClose: () => void;
    reviews: Review[];
}

const Popup: React.FC<PopupProps> = ({book, onClose, reviews}) => {
  return (
    <div className="popup-overlay">
    <div className="popup-content">
    <button className="close-btn" onClick={onClose}>✖</button>
      <div className="popup-header">
        {book.volumeInfo.imageLinks?.thumbnail && (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={`Bokomslag för ${book.volumeInfo.title}`}
            className="book-image"
          />
        )}
        <div className="book-details">
          <h2>{book.volumeInfo.title}</h2>
          <p><strong>Författare:</strong> {book.volumeInfo.authors?.join(", ") || "Okänd författare"}</p>
          <p><strong>Utgivningsdatum:</strong> {book.volumeInfo.publishedDate || "Okänt datum"}</p>
        </div>
      </div>

      <p className="book-description">{book.volumeInfo.description || "Ingen beskrivning tillgänglig."}</p>

      <h3>Recensioner</h3>
      <div className="reviews">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p><strong>{review.username}</strong> ({review.date})</p>
              <p>{review.text}</p>
            </div>
          ))
        ) : (
          <p>Inga recensioner ännu.</p>
        )}
      </div>
    </div>
  </div>
  )
}

export default Popup