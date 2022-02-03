import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import MyTextInput from './MyTextInput';

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <div className="login__container">
      <h1>S'identifier</h1>

      <Formik
        initialValues={{
          txtInput: "",
          txtPassword: "",
        }}
        validationSchema={Yup.object({
          txtInput: Yup.string()
            .required("Saisissez votre adresse e-mail.")
            .test("emptyValue", "Saisissez votre adresse e-mail", (value) => {
              if (
                !value &&
                document.activeElement === document.getElementById("txtInput")
              )
                return false;
              return true;
            })
            .test(
              "wrongValue",
              "Adresse e-mail invalide. Veuillez corriger avant de continuer.",
              (value) => {
                if (
                  value &&
                  document.activeElement !== document.getElementById("txtInput")
                ) {
                  const emailRegex =
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                  const isValidEmail = emailRegex.test(value);
                  return !isValidEmail ? false : true;
                }
                return true;
              }
            ),

          txtPassword: Yup.string()
            .required("Saisissez votre mot de passe.")
            .test("test-match", "6 caractères requis", (value) => {
              if (
                value &&
                document.activeElement !==
                  document.getElementById("txtPassword")
              ) {
                return value.length !== 6 ? false : true;
              }

              return true;
            }),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          signIn(values.txtInput, values.txtPassword);
        }}
      >
        <Form>
          <MyTextInput
            label="Adresse e-mail"
            id="txtInput"
            name="txtInput"
            type="text"
          />

          <MyTextInput
            label="Mot de passe"
            id="txtPassword"
            name="txtPassword"
            type="password"
          />

          <button type="submit">Continuer</button>
        </Form>
      </Formik>

      <p>
        En passant votre commande, vous acceptez{" "}
        <a href="#" className="link">
          les Conditions générales de vente
        </a>{" "}
        d’Amazon. Veuillez consulter notre{" "}
        <a href="#" className="link">
          Notice Protection de vos informations personnelles
        </a>
        , notre{" "}
        <a href="#" className="link">
          Notice Cookies
        </a>{" "}
        et notre{" "}
        <a href="#" className="link">
          Notice Annonces publicitaires basées sur vos centres d’intérêt
        </a>
        .
      </p>
    </div>
  );
}

export default SignIn;