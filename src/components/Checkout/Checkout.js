import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useFirestore } from "../../contexts/FirestoreContext";

import { selectCart } from "../../features/cartSlice";

import Item from "../Item/Item";
import Subtotal from "../Subtotal/Subtotal";

function Checkout() {
  const cart = useSelector(selectCart);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { updateCart, deleteCart } = useFirestore();

  useEffect(() => {
    if (clicked) {
      const newCart = cart.map((el) => {
        const { id, quantity, gift } = el;
        return { id, quantity, gift };
      });

      if (!currentUser && cart.length > 0) localStorage.setItem("cart", JSON.stringify(newCart));
      if (currentUser && cart.length > 0) updateCart("carts", currentUser.uid, Object.assign({}, newCart));

      if (!currentUser && cart.length === 0) localStorage.removeItem("cart");
      if (currentUser && cart.length === 0) deleteCart("carts", currentUser.uid);
    }
    setClicked(false);
  }, [clicked])

  let cartUI;

  if (!currentUser && cart.length === 0) {
    cartUI = (
      <>
        <img
          className="checkout__cart__image"
          src="https://m.media-amazon.com/images/G/08/cart/empty/kettle-desaturated._CB424694058_.svg"
          alt=""
        />

        <h1 className="checkout__cart__title">
          Votre panier Amazon est vide
        </h1>

        <Link className="link" to="/">
          Acheter les offres du jour
        </Link>

        <div className="checkout__connect__container">
          <button
            className="checkout__connect checkout__connect--signIn"
            onClick={() => navigate("/login")}
          >
            Connectez-vous à votre compte
          </button>

          <button
            className="checkout__connect checkout__connect--signUp"
            onClick={() => navigate("/login/register")}
          >
            Inscrivez-vous maintenant
          </button>
        </div>
      </>
    );
  } else if (currentUser && cart.length === 0) {
    cartUI = (
      <>
        <h1 className="checkout__cart__title">
          Votre panier Amazon est vide.
        </h1>

        <Link to="/" className="link link--redirect">
          continuer vos achats
        </Link>
      </>
    );
  } else {
    cartUI = (
      <>
        <h1 className="checkout__cart__title">Votre panier</h1>
        <p className="checkout__cart__p">Prix</p>
        {cart.map((product) => (
          <Item key={product.id} product={product} setClicked={setClicked} />
        ))}
        <Subtotal classname="subtotal--align" />
      </>
    );
  } 
  
  return (
    <div className="checkout">
      <div className="checkout__ad">
        <button className="checkout__ad__button">Voir plus</button>

        <p className="checkout__ad__content">
          <strong>Vous offrez, ils choisissent: </strong>Découvrez les
          chèques-cadeaux Amazon.fr
        </p>

        <img
          src="https://images-na.ssl-images-amazon.com/images/G/08/gc/2020/GC_Q4/MAPLE/MAPLE_thumbnail_2_100x80._CB415348086_.jpg"
          alt="Chèques-cadeaux Amazon.fr"
          className="checkout__ad__image"
        />
      </div>

      <div className="checkout__cart checkout__sub-container">{cartUI}</div>

      <Subtotal
        classname="checkout__subtotal checkout__sub-container"
        proceed
        setClicked={setClicked}
      />

      <div className="checkout__blank"></div>

      <div className="checkout__warning">
        <p>
          Le prix et la disponibilité des articles sur Amazon sont sujets à
          changement. Le panier est un lieu temporaire où est stockée une liste
          de vos articles et où se reflète le prix le plus récent de chaque
          article.
        </p>

        <p>
          Vous avez un chèque-cadeau ou un bon de réduction ? Nous vous
          demanderons de saisir votre code au moment de payer.
        </p>
      </div>
    </div>
  );
}

export default Checkout;
