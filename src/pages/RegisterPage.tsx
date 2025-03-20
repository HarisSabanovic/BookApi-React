import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/loginForm.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async (event : any) => {
    event.preventDefault();

    if(!username.trim() || !password.trim()) {
      setError("Fälten får inte vara tomma");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json" },
        body: JSON.stringify({username, password})
      });

      if(response.ok) {
        setSuccess("Registrering lyckades");
        setUsername("");
        setPassword("");
      } else {
        setError("Registrering misslyckades, försök igen");
      }
    } catch (error) {
      setError("Något gick fel, försök igen senare");
    }
  }
  return (
    <div className="login-container">
    <div className="book-icon">📚</div>
    <h1 className="login-header">Bokklubb Registrering</h1>
    <form className="login-form" onSubmit={registerUser}>
        <input type="text" placeholder="Användarnamn" required value={username} onChange={(event) => setUsername(event.target.value)} />
        <input type="password" placeholder="Lösenord" required value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit" className="login-btn">Registrera</button>
    </form>
    <p className="register-link">
        Har du redan ett konto? <Link to="/login">Logga in här</Link>
    </p>
  </div>
  )
}

export default RegisterPage