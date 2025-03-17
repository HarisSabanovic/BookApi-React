import { useState } from "react"
import BookCard from "../components/BookCard";

interface Book {
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

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;


  const searchBooks = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
      const data = await response.json();
      setBooks(data.items || []);
      console.log(data.items);
    } catch(error) {
      console.error("Fel vid hämtning av böcker")
    }
  }
  return (
    <div>
        <h1>Books Search</h1>
              <input 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  placeholder="Sök efter böcker..."
              />
              <button onClick={searchBooks}>Sök</button>


              <div>
                {books.map((book) => (
                    <BookCard 
                        key={book.id}
                        book={book} 
                        onSelect={(selected) => setSelectedBook(selected)} 
                    />
                ))}
            </div>
            
            {selectedBook && (
                <div>
                    <h2>{selectedBook.volumeInfo.title}</h2>
                    <p>{selectedBook.volumeInfo.description || "Ingen beskrivning tillgänglig."}</p>
                </div>
            )}
    </div>
  )
}

export default HomePage