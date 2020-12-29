import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import backend from "../api/backend";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (currentUser) {
      try {
        const user = await backend.get(`/findUser/${currentUser.email}`);
        setUser(user.data[0]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [currentUser]);

  const value = { user };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
