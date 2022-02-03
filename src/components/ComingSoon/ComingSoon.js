import { Link } from "react-router-dom";
import comingSoon from "./comingSoon.png";

const ComingSoon = () => {
  return (
    <div className="comingSoon">
      <img
        src={comingSoon}
        alt="page en construction"
        className="comingSoon__img"
      />

      <p>
        Aller sur{" "}
        <Link to="/" className="link">
          la page d'accueil d'Amazon.
        </Link>
      </p>
    </div>
  );
}

export default ComingSoon