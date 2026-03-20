import { useEffect, useState } from "react";
import "../css/myReviews.css";

interface ReviewItem {
  _id: string;
  bookId: string;
  bookTitle: string;
  username: string;
  reviewText: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const MyReviews = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchMyReviews = async () => {
    if (!token) {
      setError("Du måste vara inloggad för att se dina recensioner.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/reviews/myreviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte hämta recensioner");
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
      setError("Det gick inte att hämta dina recensioner.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const startEditing = (review: ReviewItem) => {
    setEditingId(review._id);
    setEditedText(review.reviewText);
    setEditedRating(review.rating);
    setStatusMessage("");
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedText("");
    setEditedRating(1);
  };

  const saveReview = async (reviewId: string) => {
    if (!editedText.trim()) {
      setError("Recensionstexten får inte vara tom.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewText: editedText,
          rating: editedRating,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte uppdatera recensionen");
      }

      const updatedReview = await response.json();

      setReviews((prev) =>
        prev.map((review) => (review._id === reviewId ? updatedReview : review))
      );

      setStatusMessage("Recensionen uppdaterades.");
      cancelEditing();
    } catch (error) {
      console.error(error);
      setError("Det gick inte att uppdatera recensionen.");
    }
  };

  const deleteReview = async (reviewId: string) => {
    const confirmed = window.confirm("Vill du verkligen ta bort recensionen?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:4000/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort recensionen");
      }

      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      setStatusMessage("Recensionen togs bort.");
    } catch (error) {
      console.error(error);
      setError("Det gick inte att ta bort recensionen.");
    }
  };

  if (loading) {
    return <p className="info-message">Laddar recensioner...</p>;
  }

  return (
    <section className="my-reviews-page">
      <div className="my-reviews-header">
        <h1>Mina recensioner</h1>
        <p>Här kan du läsa, redigera och ta bort dina recensioner.</p>
      </div>

      {error && <p className="error-message">{error}</p>}
      {statusMessage && <p className="success-message">{statusMessage}</p>}

      {reviews.length === 0 ? (
        <p className="info-message">Du har inte skrivit några recensioner ännu.</p>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => {
            const isEditing = editingId === review._id;

            return (
              <article key={review._id} className="my-review-card">
                <div className="review-card-top">
                  <div>
                    <h2>{review.bookTitle}</h2>
                    <p className="review-meta">Bok-ID: {review.bookTitle}</p>
                    <p className="review-meta">
                      Skapad: {new Date(review.createdAt).toLocaleDateString("sv-SE")}
                    </p>
                  </div>
                  <span className="review-rating">{review.rating}/5</span>
                </div>

                {isEditing ? (
                  <div className="edit-review-form">
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={5}
                    />
                    <label>
                      Betyg
                      <select
                        value={editedRating}
                        onChange={(e) => setEditedRating(Number(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map((rate) => (
                          <option key={rate} value={rate}>
                            {rate}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : (
                  <p className="review-text-preview">{review.reviewText}</p>
                )}

                <div className="review-actions">
                  {!isEditing ? (
                    <>
                      <button onClick={() => startEditing(review)}>Redigera</button>
                      <button onClick={() => deleteReview(review._id)} className="danger-button">
                        Ta bort
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => saveReview(review._id)}>Spara</button>
                      <button onClick={cancelEditing}>Avbryt</button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyReviews;