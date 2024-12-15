import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { useListContext } from '../../context/ListContext';
import ListInput from './ListInput';

jest.mock('../../context/ListContext', () => ({
  useListContext: jest.fn(),
}));

describe('ListInput', () => {
  const mockAddItem = jest.fn();
  const mockUpdateItem = jest.fn();
  const mockSetInputTextValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useListContext as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
      updateItem: mockUpdateItem,
      inputTextValue: 'Test Item',
      setInputTextValue: mockSetInputTextValue,
      inputActionType: 'ADD',
    });
  });

  it('renders correctly with initial state', () => {
    const { getByPlaceholderText, getByText } = render(<ListInput />);

    expect(getByPlaceholderText('Enter here')).toBeTruthy();
    expect(getByText('ADD')).toBeTruthy();
  });

  it('calls addItem and clears input when inputActionType is ADD', () => {
    const { getByText } = render(<ListInput />);

    const addButton = getByText('ADD');
    fireEvent.press(addButton);

    expect(mockAddItem).toHaveBeenCalledWith('Test Item');
    expect(mockSetInputTextValue).toHaveBeenCalledWith('');
  });

  it('calls updateItem when inputActionType is UPDATE', () => {
    (useListContext as jest.Mock).mockReturnValue({
      inputActionType: 'UPDATE',
      updateItem: mockUpdateItem,
    });
    const { getByText } = render(<ListInput />);

    const updateButton = getByText('UPDATE');
    fireEvent.press(updateButton);

    expect(mockUpdateItem).toHaveBeenCalled();
    expect(mockSetInputTextValue).not.toHaveBeenCalledWith('');
  });

  it('updates inputTextValue when text input changes', () => {
    (useListContext as jest.Mock).mockReturnValue({
      inputActionType: 'UPDATE',
      updateItem: mockUpdateItem,
      setInputTextValue: mockSetInputTextValue,
    });

    const { getByPlaceholderText } = render(<ListInput />);

    const textInput = getByPlaceholderText('Enter here');
    fireEvent.changeText(textInput, 'New Input');

    expect(mockSetInputTextValue).toHaveBeenCalledWith('New Input');
  });
});
