import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const login = async (email, password) => {
      return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logOut,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}