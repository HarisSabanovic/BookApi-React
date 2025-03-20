import { useState } from "react";
import BookCard from "../components/BookCard";
import Popup from "../components/Popup";
import "../css/homePage.css";

export interface Book {
  id: string;
  volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      description?: string;
      imageLinks?: {
          thumbnail: string;
      };
  };
}

export interface Review {
  username: string;
  date: string;
  text: string;
  rating: number;
}

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const searchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:4000/books?query=${query}`);
      const data = await response.json();
      setBooks(data || []);
    } catch (error) {
      console.error("Fel vid hämtning av böcker", error);
    }
  };


  const fetchReviewsForBook = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/${bookId}`);
      const data = await response.json();
      setReviews(data || []);
    } catch (error) {
      console.error("Fel vid hämtning av recensioner", error);
    }
  };

  return (
    <>
      <div className="hero">
        <h1>Books Search</h1>
        <div className="search-container">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Sök efter böcker..."
            id="search-input"
          />
          <button id="search-button" onClick={searchBooks}>Sök</button>
        </div>
      </div>

      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <BookCard 
              book={book} 
              onSelect={() => { 
                setSelectedBook(book); 
                fetchReviewsForBook(book.id); 
                console.log("Bok vald:", book);
              }} 
            />
          </div>
        ))}
      </div>

      {selectedBook && (
        <Popup 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          reviews={reviews} 
        />
      )}
    </>
  );
};

export default HomePage;
