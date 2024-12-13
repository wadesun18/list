import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { MyListProvider, useListContext } from '../context/ListContext';

const initialList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];

describe('MyListProvider', () => {
  it('initializes with default values', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider initialList={initialList}>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), { wrapper });

    expect(result.current.list).toEqual(initialList);
    expect(result.current.inputTextValue).toBe('');
    expect(result.current.inputActionType).toBe('ADD');
    expect(result.current.editItemIndex).toBe(null);
  });

  it('adds a new item to the list', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), { wrapper });

    act(() => {
      result.current.addItem('New Item');
    });

    expect(result.current.list).toContain('New Item');
    expect(result.current.list.length).toBe(1);
  });

  it('does not add an empty item to the list', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), { wrapper });

    act(() => {
      result.current.addItem('');
    });

    expect(result.current.list.length).toBe(0);
  });

  it('deletes an item from the list', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider initialList={initialList}>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), { wrapper });

    act(() => {
      result.current.deleteItem(1);
    });

    expect(result.current.list).not.toContain('Second Item');
  });

  it('updates an item in the list', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MyListProvider initialList={initialList}>{children}</MyListProvider>
    );

    const { result } = renderHook(() => useListContext(), { wrapper });

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

    expect(result.current.list[0]).toBe('Updated Item');
    expect(result.current.inputActionType).toBe('ADD');
    expect(result.current.inputTextValue).toBe('');
    expect(result.current.editItemIndex).toBe(null);
  });
});
