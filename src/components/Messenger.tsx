import React from 'react';
import styled from 'styled-components';
import { StoreManager } from 'context/store';
import { MainWrapper } from 'components/HOC/MainWrapper';
import { DialogWindow } from 'components/DialogWindow/DialogWindow';
import { Chats } from 'components/Chats/Chats';

export const Messenger = () => (
  <MainWrapper>
    <StoreManager>
      <StyledMessenger>
        <Chats />
        <DialogWindow />
      </StyledMessenger>
    </StoreManager>
  </MainWrapper>
);

const StyledMessenger = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  width: calc(100vw - 2.375rem);
  height: calc(100vh - 2.375rem);
  max-width: 1600px;
  box-shadow: ${({ theme }) => theme.boxShadow.block};
`;
