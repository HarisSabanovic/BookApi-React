import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import "../css/popup.css";

interface Review {
  username: string;
  date: string;
  text: string;
  rating: number;
}

interface PopupProps {
  book: any; 
  onClose: () => void;
  reviews: Review[];
}

const Popup: React.FC<PopupProps> = ({ book, onClose, reviews }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

   // Hämta användarens data från AuthContext
   const { user } = useAuth();

    // Hämta recensioner från backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/reviews/${book.id}`);
        if (!response.ok) throw new Error("Kunde inte hämta recensioner");
        
        const data = await response.json();
      
      } catch (error) {
        console.error("Fel vid hämtning av recensioner:", error);
      }
    };

    if (book.id) {
      fetchReviews(); // Endast om book.id finns
    }
  }, [book.id]);

  // Hanterar inskickandet av recensionen till servern
  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      alert("Recensionen får inte vara tom");
      return;
    }

    if (!user) {
      alert("Du måste vara inloggad för att skriva en recension.");
      return;
    }

    const backendReview = {
      bookId: book.id, // Bokens unika ID
      username: user.username,
      reviewText: reviewText,
      rating: rating,
    };

    // Hämtar JWT-token från localStorage eller context
    const token = localStorage.getItem("token"); 

    if (!token) {
      alert("Du måste vara inloggad för att lägga till en recension.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(backendReview),
      });

      if (response.ok) {
        setReviewText("");
        setRating(1);
        onClose();
      } else {
        alert("Det gick inte att lägga till recensionen.");
      }
    } catch (error) {
      console.error("Fel vid sändning av recension:", error);
      alert("Något gick fel. Försök igen senare.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="popup-header">
          {book.volumeInfo?.imageLinks?.thumbnail && (
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
          {reviews.length ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p><strong>{review.username}</strong> ({review.createdAt})</p>
                <p>{review.reviewText}</p>
              </div>
            ))
          ) : (
            <p>Inga recensioner ännu.</p>
          )}
        </div>

       
        <div className="add-review">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Skriv din recension här..."
          />
          <div>
            <label>
              Betyg:
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>{rate}</option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={handleReviewSubmit}>Skicka recension</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
