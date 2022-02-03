import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';
import { addProduct, selectCart } from '../../features/cartSlice';
import { useFirestore } from '../../contexts/FirestoreContext';

function Product({product}) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const { currentUser } = useAuth();
  const { updateCart } = useFirestore();
  const [clicked, setClicked] = useState(false);

  const {id, title, image, price, gift=false} = product;
  
  const index = cart.findIndex(product => product.id === id);
  const quantity = cart[index]?.quantity ?? 0;
  
  const handleClick = () => {
    setClicked(true);
    dispatch(addProduct({ ...product, quantity: quantity + 1, gift }));
  }
  
  useEffect(() => {
    if (clicked) {
      const newCart = cart.map(product => {
        const {id, quantity, gift=false} = product;
        return {id, quantity, gift}
      })
      
      if(!currentUser) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
  
      if (currentUser) {
        updateCart("carts", currentUser.uid, Object.assign({}, newCart));
      }

      setClicked(false);
    }
  }, [clicked]);

  return (
    <div className="product" data-id={id + 1}>
      <img src={image} alt={title} />
      <div className="product__info">
        <p className="product__title">{title}</p>
        <div className="product__rating">
          <span className="product__comments">(10000)</span>
        </div>
        <p className="product__price">
          <strong>{price}</strong>
          <small className="product__price__logo">€</small>
        </p>
      </div>
      <button onClick={handleClick} className="button button--add-to-basket">
        Ajouter au panier
      </button>
    </div>
  );
}

export default Product; 