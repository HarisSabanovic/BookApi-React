import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../css/loginForm.css';

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login} = useAuth();
  const navigate = useNavigate();


  const submitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

     
    try {
      await login({username, password});
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
    </div>
  )
}

export default LoginPage