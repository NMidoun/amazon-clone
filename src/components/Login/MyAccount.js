import { useAuth } from "../../contexts/AuthContext";

const MyAccount = () => {
  const { logOut, setName } = useAuth();
    
  return (
    <div className="login">

      <div className="login__container login__container--margin">
        <h1>Vous êtes connecté !</h1>

        <button
          onClick={() => {
            logOut();
            setName(false);
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default MyAccount;