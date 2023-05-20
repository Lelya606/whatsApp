import React, { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { Messenger } from 'components/Messenger';
import { Login } from 'components/Login';
import { getLocalStorage } from 'services/storageService';
import { AUTH, ROUTS } from 'constants/common';
import { useAuth } from 'context/auth';

const { LOGIN, MESSAGE } = ROUTS;
const { API_TOKEN_INSTANCE, ID_INSTANCE } = AUTH;

export const App = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const routes = useRoutes([
    { path: MESSAGE, element: <Messenger /> },
    { path: LOGIN, element: <Login /> },
  ]);

  useEffect(() => {
    const id = getLocalStorage(ID_INSTANCE);
    const apiToken = getLocalStorage(API_TOKEN_INSTANCE);

    if (id && apiToken) {
      setAuth &&
        setAuth({
          idInstance: id,
          apiTokenInstance: apiToken,
        });
      return navigate(MESSAGE);
    }

    return navigate(LOGIN);
  }, []);

  return routes;
};
