import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { selectCart, updateGift } from "../../features/cartSlice";

const Subtotal = ({ classname, proceed, setClicked }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [className, setClassName] = useState("subtotal__price");
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  const spelling = cart.length > 1 || cart[0]?.quantity > 1 ? "articles" : "article";
  
  let totalQuantities = 0;
  let totalPrice = 0;
  let gift = false;
  for (const item of cart) {
    totalQuantities += item.quantity;
    totalPrice += item.price * item.quantity;
    if (item.gift) {
      gift = true;
    }
  }

  useEffect(() => {
    if (totalPrice.toString().length > 5) {
      setClassName("subtotal__price subtotal__price--margin");
    } else {
      setClassName("subtotal__price");
    }
  }, [totalPrice]);

  const handleAllGift = (e) => {
    setClicked(true);
    cart.forEach((item) => {
      const id = item.id;
      dispatch(updateGift({ id, gift: e.target.checked }));
    });  
  }

  const handleClick = () => {
    if (!currentUser) navigate("/login");
    else navigate("/comingSoon");
  }
    
  const subtotal =
    cart.length === 0 ? null : (
      <div className={`${classname} subtotal`}>
        {proceed ? (
          <div className="subtotal__container">
            <p className="subtotal__info">
              <span className="subtotal__info--success">
                Votre commande est éligible à la livraison Standard gratuite en
                France métropolitaine. Restrictions applicables
              </span>
              <br />
              Choisissez cette option lors de votre commande
            </p>
          </div>
        ) : null}
        <p className={className} data-testid="subtotal">
          Sous-total ({totalQuantities} {spelling}):
          <strong> {totalPrice.toFixed(2)} €</strong>
        </p>
        {proceed ? (
          <>
            <input
              type="checkbox"
              name="chkSubtotalGift"
              id="chkGift"
              checked={gift}
              onChange={handleAllGift}
            />
            <label htmlFor="chkGift">Commande contenant un cadeau</label>
            <button className="subtotal__proceed" onClick={handleClick}>Passez la commande</button>
          </>
        ) : null}
      </div>
    );
    
  return subtotal;
};

export default Subtotal;
