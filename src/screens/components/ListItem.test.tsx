import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { useListContext } from '../../context/ListContext';
import ListItem from './ListItem';

jest.mock('../../context/ListContext', () => ({
  useListContext: jest.fn(),
}));
jest.mock('@expo/vector-icons/Ionicons');
jest.mock('@expo/vector-icons/Octicons');

describe('ListItem', () => {
  const mockDeleteItem = jest.fn();
  const mockUpdateItemActionOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useListContext as jest.Mock).mockReturnValue({
      deleteItem: mockDeleteItem,
      updateItemActionOnPress: mockUpdateItemActionOnPress,
    });
  });

  it('renders the list item correctly', () => {
    const item = 'Test Item';
    const index = 0;

    const { getByText } = render(<ListItem item={item} index={index} />);

    expect(getByText('Test Item')).toBeTruthy();
  });

  it('calls deleteItem when delete button is pressed', () => {
    const item = 'Test Item';
    const index = 0;

    const { getByLabelText } = render(<ListItem item={item} index={index} />);
    const deleteButton = getByLabelText('Delete item');

    fireEvent.press(deleteButton);

    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteItem).toHaveBeenCalledWith(index);
  });

  it('calls updateItemActionOnPress when card is pressed', () => {
    const item = 'Test Item';
    const index = 0;

    const { getByText } = render(<ListItem item={item} index={index} />);
    const card = getByText('Test Item').parent;

    fireEvent.press(card);

    expect(mockUpdateItemActionOnPress).toHaveBeenCalledTimes(1);
    expect(mockUpdateItemActionOnPress).toHaveBeenCalledWith(index);
  });
});
