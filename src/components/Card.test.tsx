import React from 'react';

import { Text } from 'react-native';

import { render } from '@testing-library/react-native';

import Card from '../components/Card';

describe('Card Component', () => {
  it('renders correctly with default height', () => {
    const { getByText } = render(
      <Card
        leftComponent={<Text>Left Component</Text>}
        rightComponent={<Text>Right Component</Text>}
      />,
    );

    expect(getByText('Left Component')).toBeTruthy();
    expect(getByText('Right Component')).toBeTruthy();
  });

  it('applies the given height as a number', () => {
    const { getByTestId } = render(
      <Card
        leftComponent={<Text>Left Component</Text>}
        rightComponent={<Text>Right Component</Text>}
        height={150}
      />,
    );

    const cardContainer = getByTestId('CardContainer');
    expect(cardContainer.props.style.height).toBe(150);
  });
});
