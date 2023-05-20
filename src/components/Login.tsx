import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainWrapper } from 'components/HOC/MainWrapper';
import { Input } from 'components/Input/Input';
import { useAuth } from 'context/auth';
import { setLocalStorage } from 'services/storageService';
import { getStatusInstance } from 'services/authService';
import { AuthType } from 'types/authType';
import { AUTH, AUTH_STATUS, ROUTS } from 'constants/common';

const { AUTHORIZED } = AuthType;
const { API_TOKEN_INSTANCE, ID_INSTANCE } = AUTH;
const { MESSAGE } = ROUTS;

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setTokenInstance] = useState('');

  const onClick = async () => {
    const { stateInstance } = await getStatusInstance({
      idInstance,
      apiTokenInstance,
    });
    if (stateInstance !== AUTHORIZED) {
      alert(AUTH_STATUS[stateInstance as AuthType]);
      return;
    }
    setLocalStorage(ID_INSTANCE, idInstance);
    setLocalStorage(API_TOKEN_INSTANCE, apiTokenInstance);
    setAuth &&
      setAuth({
        idInstance,
        apiTokenInstance,
      });
    navigate(MESSAGE);
  };

  return (
    <MainWrapper>
      <StyledLogin>
        <StyledTitle>Вход</StyledTitle>
        <StyledWrapper>
          <Input
            type="text"
            onChange={setIdInstance}
            placeholder="idInstance"
          />
          <Input
            type="text"
            onChange={setTokenInstance}
            placeholder="apiTokenInstance"
          />
        </StyledWrapper>
        <StyledButton onClick={onClick}>Send</StyledButton>
      </StyledLogin>
    </MainWrapper>
  );
};

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: flex-start;
  align-items: center;
  row-gap: 10px;
  padding: 20px;
  margin-top: 80px;
  min-width: 400px;
  min-height: 170px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: ${({ theme }) => theme.boxShadow.block};
`;

const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.AZTEC};
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  width: 100%;
`;

const StyledTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;
