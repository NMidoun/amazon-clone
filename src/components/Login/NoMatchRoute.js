import { Link } from "react-router-dom";

const NoMatchRoute = () => {
  return (
    <div className="nomatch">
      <div className="container">
        <p>DÉSOLÉ</p>
        <p>cette page n'existe pas (plus).</p>
        <p>
          Reformulez votre recherche ou allez sur{" "}
          <Link to="/">
            la page d’accueil d’Amazon
          </Link>
          .
        </p>
        <a>
          <img
            src="https://m.media-amazon.com/images/G/02/error/6.-TTD-c.jpg"
            alt="Les chiens d'Amazon"
          />
          <p>Profitez-en pour faire connaissance avec les chiens d’Amazon</p>
        </a>
      </div>
    </div>
  );
}

export default NoMatchRoute