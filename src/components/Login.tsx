import React from 'react';
import styled from 'styled-components';
import { MainWrapper } from 'components/HOC/MainWrapper';

export const Login = () => (
  <MainWrapper>
    <StyledLogin>;;</StyledLogin>
  </MainWrapper>
);

const StyledLogin = styled.div`
  width: 500px;
  height: 500px;
  box-shadow: ${({ theme }) => theme.boxShadow.block};
`;
