import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useAuth } from "../../contexts/AuthContext";
import Message from './Message';
import LegalText from './LegalText';

const Register = () => {
  const [message, setMessage] = useState('');
  
  const { signUp, error, setError } = useAuth();

  useEffect(() => {
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      setMessage("userExists");
    } 
    return () => {
      setError('');
    };
  }, [error])

  return (
    <div className="login">
      <Link to="/">
        <span className="login__logo" />
      </Link>

      <Message type={message} />

      <div className="login__container">
        <h1>Créer un compte</h1>

        <Formik
          initialValues={{
            txtName: "",
            txtInputValue: "",
            txtPassword: "",
            txtPasswordAgain: "",
          }}
          validationSchema={Yup.object({
            txtName: Yup.string().required("Saisissez votre nom"),
            txtInputValue: Yup.string()
              .required(
                "Saisissez votre adresse e-mail."
              )
              .test(
                "test-name",
                "Adresse e-mail incorrect ou invalide. Veuillez corriger avant de réessayer.",
                (value) => {
                  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                  let isValidEmail = emailRegex.test(value);

                  if (
                    value &&
                    document.activeElement !==
                      document.getElementById("txtInputValue")
                  ) {
                    return !isValidEmail ? false : true;
                  }

                  return true;
                }
              ),
            txtPassword: Yup.string()
              .required("6 caractères minimum requis.")
              .test("test-match", "6 caractères minimum requis", (value) => {
                if (
                  value &&
                  document.activeElement !==
                    document.getElementById("txtPassword")
                ) {
                  return value.length < 6 ? false : true;
                }

                return true;
              }),
            txtPasswordAgain: Yup.string()
              .test(
                "test-match",
                "Les mots de passe ne correspondent pas.",
                (value) => {
                  if (
                    value &&
                    document.activeElement !==
                      document.getElementById("txtPasswordAgain") &&
                    document.getElementById("txtPassword").value !== ""
                  ) {
                    return value !==
                      document.getElementById("txtPassword").value
                      ? false
                      : true;
                  }

                  return true;
                }
              )
              .test(
                "test-emptyString",
                "Ressaisissez votre mot de passe.",
                (value) => {
                  if (
                    !value &&
                    document.getElementById("txtPassword").value.length === 6
                  )
                    return false;

                  return true;
                }
              ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);

            signUp(values.txtInputValue, values.txtPassword, values.txtName);
          }}
        >
          <Form>
            <MyTextInput
              className="signUpInput"
              label="Votre nom"
              id="txtName"
              name="txtName"
              type="text"
              placeholder="Prénom Nom"
            />

            <MyTextInput
              className="signUpInput"
              label="Adresse e-mail"
              id="txtInputValue"
              name="txtInputValue"
              type="text"
            />

            <MyTextInput
              className="signUpInput"
              label="Mot de passe"
              id="txtPassword"
              name="txtPassword"
              type="password"
              placeholder="Au moins 6 caractères"
            />

            <MyTextInput
              className="signUpInput"
              label="Entrez le mot de passe à nouveau"
              id="txtPasswordAgain"
              name="txtPasswordAgain"
              type="password"
            />

            <button id="signUpBtn" type="submit">
              Créez votre compte Amazon
            </button>
          </Form>
        </Formik>

        <LegalText />

        <p>
          Vous possédez déjà un compte ?
          <Link to="/login" className="link">
            Identifiez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;