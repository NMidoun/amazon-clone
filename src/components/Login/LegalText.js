const LegalText = () => {
  return (
    <p>
      En créant un compte, vous acceptez
      <a href="#" className="link">
        {" "}
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
  );
}

export default LegalText