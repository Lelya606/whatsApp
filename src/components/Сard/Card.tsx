import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Photo } from 'assets/icons/photo.svg';

interface IChatCardProps {
  active: boolean;
  title: string;
  subTitle?: string;
  text?: string;
  onClick?: (value: string) => void;
}

export const Card = ({
  active,
  title,
  subTitle,
  text,
  onClick,
}: IChatCardProps) => {
  const onClickCard = () => {
    onClick && onClick(title);
  };

  return (
    <StyledCard active={active} onClick={onClickCard}>
      <StyledPhoto>
        <Photo />
      </StyledPhoto>
      <StyledTextWrapper>
        <StyledTitle>{title}</StyledTitle>
        {subTitle && <StyledSubTitle>{subTitle}</StyledSubTitle>}
        {text && <StyledText>{text}</StyledText>}
      </StyledTextWrapper>
    </StyledCard>
  );
};

export const StyledCard = styled.div<{ active: boolean }>`
  display: flex;
  column-gap: 1rem;
  padding: 0.75rem 1rem;
  background-color: ${({ theme, active }) =>
    active && theme.colors.ATHENS_GRAY};

  :hover {
    cursor: pointer;
    background-color: ${({ theme, active }) =>
      active ? theme.colors.ATHENS_GRAY : theme.colors.BLACK_HAZE};
  }
`;

const StyledPhoto = styled.div`
  svg {
    width: 3.0625rem;
    height: 3.0625rem;

    .a {
      fill: ${({ theme }) => theme.colors.GEYSER};
    }
    .b {
      fill: ${({ theme }) => theme.colors.WHITE};
    }
  }
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.1rem;
  max-width: 400px;
`;

const StyledTitle = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.BUNKER};
`;

const StyledSubTitle = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.PALE_SKY};
`;

const StyledText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.PALE_SKY};
`;
