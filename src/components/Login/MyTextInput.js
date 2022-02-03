import { useField } from 'formik';
import { useEffect } from 'react';

const MyTextInput = ({ label, ...props }) => {
  
  const [field, meta] = useField(props);

  useEffect(() => {
    const el = document.getElementById(props.id);
    if (meta.touched && meta.error) {
      el.classList.add("login__input--error");
    } 

    if (meta.touched && !meta.error) {
      el.classList.remove("login__input--error");
    }
  }, [meta.touched, meta.error]);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} className="login__input" />
      {meta.touched && meta.error ? (
        <>
          <div className="login__input__error__message">{meta.error}</div>
        </>
      ) : null}
    </>
  );
};

export default MyTextInput