import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useMsal } from "@azure/msal-react";

export const AuthContext = React.createContext(
  {} as {
    user: any,
    updateUser: (user: any) => void
  }
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const updateUser = (user: any) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};