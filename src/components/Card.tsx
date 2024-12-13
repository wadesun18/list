import React, { ReactNode, memo } from 'react';

import styled from 'styled-components/native';

import { BLACK, GRAY_WHITE } from '../constants';

type CardContainerProps = {
  height?: string | number;
};

const CardContainer = styled.View<CardContainerProps>`
  height: ${(props) =>
    typeof props.height === 'string' ? props.height : `${props.height}px`};
  width: 100%;
  border-radius: 10px;
  background-color: ${GRAY_WHITE};
  shadow-color: ${BLACK};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

const InnerCard = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  align-items: center;
`;

type CardProps = {
  rightComponent: ReactNode;
  leftComponent: ReactNode;
  height?: string | number;
};

/**  Card component takes in a left and right component */
const Card = memo(({ rightComponent, leftComponent, height }: CardProps) => {
  return (
    <CardContainer height={height} testID="CardContainer">
      <InnerCard>
        {leftComponent}
        {rightComponent}
      </InnerCard>
    </CardContainer>
  );
});

Card.displayName = 'Card';

export default Card;
