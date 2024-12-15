import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';

import { MyListProvider, useListContext } from '../context/ListContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('MyListProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default values', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(undefined);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.list).toEqual([]));
    expect(result.current.inputTextValue).toBe('');
    expect(result.current.inputActionType).toBe('ADD');
    expect(result.current.editItemIndex).toBe(null);
  });

  it('loads initial list from AsyncStorage', async () => {
    const mockList = JSON.stringify(['Item 1', 'Item 2']);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockList);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), {
      wrapper,
    });
    await waitFor(() =>
      expect(result.current.list).toEqual(['Item 1', 'Item 2']),
    );
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'MY_LIST',
      JSON.stringify(['Item 1', 'Item 2']),
    );
  });

  it('adds a new item to the list and saves to AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), {
      wrapper,
    });

    act(() => {
      result.current.addItem('New Item');
    });

    await waitFor(() => expect(result.current.list).toEqual(['New Item']));
  });

  it('does not save an empty list to AsyncStorage', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    renderHook(() => useListContext(), { wrapper });

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('deletes an item from the list and saves to AsyncStorage', async () => {
    const mockList = JSON.stringify(['First Item', 'Second Item']);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockList);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useListContext(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'MY_LIST',
      JSON.stringify(['First Item', 'Second Item']),
    );
    expect(result.current.list).toEqual(['First Item', 'Second Item']);

    act(() => {
      result.current.deleteItem(0); // Deletes 'First Item'
    });

    expect(result.current.list).toEqual(['Second Item']);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'MY_LIST',
      JSON.stringify(['Second Item']),
    );
  });

  it('updates an item in the list', async () => {
    const mockList = JSON.stringify(['First Item', 'Second Item']);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockList);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useListContext(), {
      wrapper,
    });

    await waitForNextUpdate();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'MY_LIST',
      JSON.stringify(['First Item', 'Second Item']),
    );

    act(() => {
      result.current.updateItemActionOnPress(0);
    });

    expect(result.current.inputActionType).toBe('UPDATE');
    expect(result.current.editItemIndex).toBe(0);
    expect(result.current.inputTextValue).toBe('First Item');

    act(() => {
      result.current.setInputTextValue('Updated Item');
    });

    expect(result.current.inputTextValue).toBe('Updated Item');

    act(() => {
      result.current.updateItem();
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'MY_LIST',
      JSON.stringify(['Updated Item', 'Second Item']),
    );
    expect(result.current.list[0]).toBe('Updated Item');
    expect(result.current.inputActionType).toBe('ADD');
    expect(result.current.inputTextValue).toBe('');
    expect(result.current.editItemIndex).toBe(null);
  });
});
