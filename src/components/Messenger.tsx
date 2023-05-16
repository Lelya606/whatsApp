import React from 'react';
import styled from 'styled-components';
import { MainWrapper } from 'components/HOC/MainWrapper';
import { DialogWindow } from 'components/DialogWindow/DialogWindow';
import { Chats } from 'components/Chats/Chats';

export const Messenger = () => (
  <MainWrapper>
    <StyledMessenger>
      <Chats />
      <DialogWindow />
    </StyledMessenger>
  </MainWrapper>
);

const StyledMessenger = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  width: calc(100vw - 38px);
  height: calc(100vh - 38px);
  max-width: 1600px;
  box-shadow: ${({ theme }) => theme.boxShadow.block};
`;
