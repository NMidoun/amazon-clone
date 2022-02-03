import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import amazonLogo from './amazonLogo.png';

import { selectCart } from '../../features/cartSlice';

const Header = () => {
  const cart = useSelector(selectCart);
  const { currentUser } = useAuth();

  const path = currentUser ? "/comingSoon" : "/login";
  const name = currentUser ? ` ${currentUser.displayName}` : ", Identifiez-vous";

  let quantities = 0;
  for (const item of cart) {
    quantities += item.quantity;
  }

  useEffect(() => {
    if(quantities >= 10) {
      document
        .getElementById("card-quantity")
        .classList.add("header__basket__value--relative");
    } else {
      document
        .getElementById("card-quantity")
        .classList.remove("header__basket__value--relative");
    }

  }, [quantities])

  useEffect(() => {
    if(currentUser) {
      document.getElementsByClassName("header__link")[1].classList.add("header__link--padding")
    } else {
      document.getElementsByClassName("header__link")[1].classList.remove("header__link--padding")
    }
  }, [currentUser])

  const handleChecked = (e) => { 
    if (e.target.checked) {
      document.body.style.overflowY = "hidden";
      document.querySelector("html").style.overflowY = "hidden";
      document.body.style.position = "relative"
    } else {
      document.body.style.overflowY = "inherit";
      document.querySelector("html").style.overflowY = "inherit";
    }
  }

  const handleBlur = () => {
    document.getElementsByClassName("header__burger__input")[0].click();
  } 

  const handleFocusInput = (e) => {
    e.currentTarget.style.outline = "#fff";
    document.getElementsByClassName("header__search")[0].style.backgroundColor = "#fff"
    document.getElementsByClassName("header__search")[0].style.outline = "3px solid #f08809"
    document.getElementsByClassName("header__search")[0].style.borderRadius = "4px"
  }
    
  const handleBlurInput = () => {
    document.getElementsByClassName("header__search")[0].style.backgroundColor = "none"
    document.getElementsByClassName("header__search")[0].style.outline = "none"
    document.getElementsByClassName("header__search")[0].style.borderRadius = "none"
  }
  
  const handleBlurButton = (e) => {
    e.currentTarget.style.outline = "#fff";
  }
  
  const handleMouseDown = (e) => {
    e.currentTarget.style.outline = "3px solid #f08809";
  }
  
  const handleMouseUp = (e) => {
    e.currentTarget.style.outline = "#fff";
  }
  
  return (
    <>
      <nav className="header">
        <input
          type="checkbox"
          name="chkBurger"
          onChange={handleChecked}
          className="header__burger__input"
        />
        <div className="header__burger__div" />
        <div className="header__blur" onClick={handleBlur} />

        <Link to="/" className="header__link">
          <img className="header__logo" src={amazonLogo} alt="Amazon" />
        </Link>

        <div className="header__search__temporary">
          <input type="text" className="header__search__input" />
          <button className="header__search__btn" />
        </div>

        <div className="header__menu">
          <div className="header__search">
            <input
              type="text"
              className="header__search__input"
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
            />
            <button
              className="header__search__btn"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onBlur={handleBlurButton}
            />
          </div>
          <div className="header__links">
            <Link to="/login" className="header__link">
              <span className="header__line1">Bonjour{name}</span>
              <span className="header__line2 header__dropdown">
                Compte et listes
              </span>
            </Link>

            <Link to={path} className="header__link">
              <span className="header__line1">Retours </span>
              <span className="header__line2">et Commandes</span>
            </Link>
          </div>
        </div>

        <Link to="/checkout" className="header__link">
          <div className="header__basket">
              <span
                className="header__basket__value"
                id="card-quantity"
                data-testid="basket"
              >
                {quantities}
              </span>
              <span>Panier</span>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default Header;
