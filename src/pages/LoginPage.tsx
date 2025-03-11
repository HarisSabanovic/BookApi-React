import '../css/loginForm.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="book-icon">📚</div>
      <h1 className="login-header">Bokklubb Inloggning</h1>
      <form className="login-form">
          <input type="text" placeholder="Användarnamn" required />
          <input type="password" placeholder="Lösenord" required />
          <button type="submit" className="login-btn">Logga in</button>
      </form>
    </div>
  )
}

export default LoginPage