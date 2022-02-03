import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, selectCart, updateGift } from '../../features/cartSlice';

const Item = ({ product, setClicked }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [className, setClassName] = useState("item__quantity__value");

  const { id, quantity, gift, price, image, title } = product;

  const handleAdd = (e) => {
    setClicked(true);
    dispatch(addProduct({ id, quantity: e.target.value }));
  };

  const handleDelete = () => {
    setClicked(true);
    const index = cart.findIndex(product => product.id === id);
    dispatch(deleteProduct(index));
  };

  const handleGift = (e) => {
    setClicked(true);
    dispatch(updateGift({ id, gift: e.target.checked }));
  };

  useEffect(() => {
    if (quantity > 9) {
      setClassName("item__quantity__value--margin");
    } else {
      setClassName("item__quantity__value");
    }
  }, [quantity]);

  return (
    <div className="item">
      <img className="item__image" src={image} alt="cart item" />

      <div className="item__price">
        <strong>{price} €</strong>
      </div>

      <p className="item__title">{title}</p>

      <div className="item__extra">
        <p>En stock</p>

        <input
          type="checkbox"
          name="chkItemGift"
          id={id}
          checked={gift}
          onChange={handleGift}
        />

        <label htmlFor={id}>Ceci sera un cadeau</label>

        <a href="#" className="link">
          En savoir plus
        </a>
      </div>

      <div className="item__actions">
        <div className="item__quantity">
          <span className={className}> Qté: {quantity} </span>

          <select name="slcQt" data-testid="select" onChange={handleAdd}>
            {Array(9)
              .fill()
              .map((_, index) => (
                <option key={index}> {index + 1} </option>
              ))}
          </select>
        </div>

        <div className="item__delete">
          <a href="#" className="link" onClick={handleDelete}>
            Supprimer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Item