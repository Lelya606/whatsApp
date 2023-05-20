import React, { createContext, useContext, useMemo, useState } from 'react';
import { IAuthContextValue, IStoreManagerProps } from 'context/types';
import { IAuth } from 'services/types/types';

const defaultValue = {
  auth: {
    apiTokenInstance: '',
    idInstance: '',
  },
  setAuth: null,
};

const AuthContext = createContext<IAuthContextValue>(defaultValue);

export const AuthProvider = ({ children }: IStoreManagerProps) => {
  const [auth, setAuth] = useState<IAuth>(defaultValue.auth);

  const store: IAuthContextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth, setAuth],
  );

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext<IAuthContextValue>(AuthContext);
