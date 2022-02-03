import { useEffect } from "react";

const Message = ({ type }) => {

  useEffect(() => {
    if (type === "userExists") {
      document.getElementById("txtInputValue").focus();
    }
  }, [type])
  
  if (type === "errorEmail") {
    return (
      <div className="login__message login__message--red">
        <h4>Un problème est survenu</h4>
        <p>
          Impossible de trouver un compte correspondant à cette adresse e-mail
        </p>
      </div>
    );
  }

  if (type === "errorPassword") {
    return (
      <div className="login__message login__message--red">
        <h4>Un problème est survenu</h4>
        <p>Votre mot de passe est incorrect</p>
      </div>
    );
  }

  if (type === "userExists") {
    return (
      <div className="login__message login__message--red">
        <h4>Utilisateur existant</h4>
        <p>
          Veuillez modifier l'adresse email.
        </p>
      </div>
    )
  } 
  
  return null;
};

export default Message;
