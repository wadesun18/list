import React from 'react';

import { render } from '@testing-library/react-native';

import { useListContext } from '../context/ListContext';
import List from './List';

jest.mock('../context/ListContext', () => ({
  useListContext: jest.fn(),
}));
jest.mock('@expo/vector-icons/Ionicons');
jest.mock('@expo/vector-icons/Octicons');

describe('List Component', () => {
  const mockList = ['First Item', 'Second Item'];

  beforeEach(() => {
    jest.clearAllMocks();
    (useListContext as jest.Mock).mockReturnValue({
      list: mockList,
    });
  });

  it('renders the title and list correctly', () => {
    const { getByText, getAllByText } = render(<List />);

    expect(getByText('TODO LIST')).toBeTruthy();
    expect(getByText('First Item')).toBeTruthy();
    expect(getByText('Second Item')).toBeTruthy();
    expect(getAllByText(/Item/).length).toBe(mockList.length);
  });

  it('renders the ListInput component', () => {
    const { getByPlaceholderText } = render(<List />);

    expect(getByPlaceholderText('Enter here')).toBeTruthy();
  });
});
