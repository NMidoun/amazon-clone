import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState(false);


  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const displayName = name;
      await updateProfile(user, { displayName });
      setName(true);
    } catch (e) {
      console.log(e);
      setError(e.message)
    }
  };

  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem("logged");
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setIsLoadingAuth(!isLoadingAuth); 
    });
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    isLoadingAuth,
    error,
    name,
    setName,
    setError,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);