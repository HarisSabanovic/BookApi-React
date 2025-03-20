import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../css/loginForm.css';

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login, user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect körs. user är:", user);

    if(user) {
      navigate("/myreviews");
    }
  }, [user])

  const submitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

     
    try {
      await login({username, password});
      console.log("Inloggning lyckades!"); 
      navigate("/register");
    } catch (error) {
      setError("Inloggningen misslyckades. Kontrollera inmatning")
    }
  }
  
  return (
    <div className="login-container">
      <div className="book-icon">📚</div>
      <h1 className="login-header">Bokklubb Inloggning</h1>
      <form className="login-form" onSubmit={submitHandler}>
          <input type="text" placeholder="Användarnamn" required value={username} onChange={(event) => setUsername(event.target.value)} />
          <input type="password" placeholder="Lösenord" required value={password} onChange={(event) => setPassword(event.target.value)}/>
          <button type="submit" className="login-btn">Logga in</button>
      </form>
      <p className="register-link">
        Har du inget konto? <Link to="/register">Registrera dig här</Link>
    </p>
    </div>
  )
}

export default LoginPage