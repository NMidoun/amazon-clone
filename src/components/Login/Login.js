import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Message from './Message';
import SignIn from "./SignIn";

function Login() {
  const [message, setMessage] = useState("");
  const { error, setError } = useAuth();

  useEffect(() => {
    if (error === "Firebase: Error (auth/user-not-found).") {
      setMessage("errorEmail");
    } else if (error === "Firebase: Error (auth/wrong-password).") {
      setMessage("errorPassword");
    } 
    return () => {
      setError('');
    }
  }, [error]);

  return (
    <div className="login">
      <Link to="/">
        <span className="login__logo" />
      </Link>

      <Message type={message} />

      <SignIn setMessage={setMessage} />

      <div className="login__new-account">
        <h5>Nouveau sur Amazon ?</h5>

        <Link to="register">
          <button className="login__sign-up">Créer votre compte Amazon</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
