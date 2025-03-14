import { useState } from "react"


const HomePage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBm0cqyfBpxn59su38MwwSwO_jM6sU8j3g`);
      const data = response.json();
      setBooks(data.items || []);
    } catch(error) {
      console.error("Fel vid hämtning av böcker")
    }
  }
  return (
    <div>
        <h1>Books Search</h1>
        <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök efter böcker..."/>
        <button onClick={searchBooks}>Sök</button>
    </div>
  )
}

export default HomePage