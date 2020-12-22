import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

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
        const user = await axios.get(
          `http://localhost:5000/findUser/${currentUser.email}`
        );
        console.log(user.data[0]);
        setUser(user.data[0]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [currentUser]);

  const value = { user };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
