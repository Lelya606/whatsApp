import React from 'react';
import styled from 'styled-components';

export const Chats = () => <StyledChats />;

const StyledChats = styled.div`
  background-color: ${({ theme }) => theme.colors.WHITE};
`;
