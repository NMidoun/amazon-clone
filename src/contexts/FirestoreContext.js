import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

import { addProduct, selectCart } from "../features/cartSlice";

const FirestoreContext = createContext();

export const FirestoreProvider = ({children}) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart)
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    cart.forEach(el => {
      const index = products.findIndex(product => product.id === el.id);
      const productUpdated = { ...products[index], ...el };
  
      dispatch(addProduct(productUpdated));
    }) 
  }, [cart]);

  const getProducts = async (name, ref) => {
    const docRef = doc(db, name, ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const firestoreValues = Object.keys(docSnap.data()).map((key) => {
        const value = Object.values(docSnap.data())[key];
        return { ...value };
      });

      const products = firestoreValues.map(product => product);
      setProducts(products);
      setIsLoadingProducts(false);

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const updateCart = async (name, ref, data) => {
    // returns doc reference
    await setDoc(doc(db, name, ref), data)
  }

  const getCart = async (name, ref) => {
    const docRef = doc(db, name, ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const firestoreValues = Object.keys(docSnap.data()).map(key => {
        const value = Object.values(docSnap.data())[key];
        return {...value};
      });

      firestoreValues.map(product => {
        const index = products.findIndex((el) => el.id === product.id);
        const productUpdated = { ...products[index], ...product };
        dispatch(addProduct(productUpdated));
      })
        
    } else {
      // doc.data() will be undefined in this case
      console.log("No basket available!"); 
    }
  };

  const deleteCart = async (name, ref) => {
    await deleteDoc(doc(db, name, ref));
  }

  const value = {
    updateCart,
    getCart,
    deleteCart,
    getProducts,
    products,
    isLoadingProducts,
  };

  return (
    <FirestoreContext.Provider value={value} >
      {children}
    </FirestoreContext.Provider>
  )
}

export const useFirestore = () => useContext(FirestoreContext);