import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type ToDoItem = string;
export type List = ToDoItem[];
export type ActionType = 'ADD' | 'UPDATE';

export type ListContent = {
  list: List;
  addItem: (newItem: ToDoItem) => void;
  deleteItem: (index: number) => void;
  updateItem: () => void;
  inputTextValue: string;
  setInputTextValue: Dispatch<SetStateAction<string>>;
  updateItemActionOnPress: (index: number) => void;
  inputActionType: ActionType;
  setInputActionType: Dispatch<SetStateAction<ActionType>>;
  editItemIndex: number | null;
  setEditItemIndex: Dispatch<SetStateAction<number | null>>;
};

export const MyListContext = createContext<ListContent | null>(null);

const STORAGE_KEY = 'MY_LIST';

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<List>([]);
  const [inputTextValue, setInputTextValue] = useState('');
  const [inputActionType, setInputActionType] = useState<ActionType>('ADD');
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

  // Load the list from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadList() {
      try {
        const storedList = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedList) {
          setList(JSON.parse(storedList));
        }
      } catch (e) {
        console.error('Failed to load the list from AsyncStorage', e);
      }
    }

    loadList();
  }, []);

  // Save the list to AsyncStorage whenever it changes so the list items can persist
  useEffect(() => {
    async function saveList() {
      if (list && list.length !== 0) {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (e) {
          console.error('Failed to save the list to AsyncStorage', e);
        }
      }
    }

    saveList();
  }, [list]);

  const resetInput = useCallback(() => {
    setInputTextValue('');
    setEditItemIndex(null);
    setInputActionType('ADD');
  }, []);

  const addItem = useCallback((newItem: ToDoItem) => {
    if (!newItem.trim()) return;
    setList((prevList) => [...prevList, newItem.trim()]);
  }, []);

  const deleteItem = useCallback(
    (index: number) => {
      setList((prevList) => prevList.filter((_, i) => i !== index));
      resetInput();
    },
    [resetInput],
  );

  const updateItemActionOnPress = useCallback(
    (index: number) => {
      setInputActionType('UPDATE');
      setEditItemIndex(index);
      setInputTextValue(list[index]);
    },
    [list],
  );

  const updateItem = useCallback(() => {
    if (!inputTextValue.trim() || editItemIndex === null) return;

    setList((prevList) => {
      return prevList.map((item, i) =>
        i === editItemIndex ? inputTextValue : item,
      );
    });

    resetInput();
  }, [editItemIndex, inputTextValue, resetInput]);

  const state = useMemo(
    () => ({
      list,
      setList,
      addItem,
      deleteItem,
      inputTextValue,
      setInputTextValue,
      updateItemActionOnPress,
      inputActionType,
      setInputActionType,
      updateItem,
      editItemIndex,
      setEditItemIndex,
    }),
    [
      list,
      addItem,
      deleteItem,
      inputTextValue,
      updateItemActionOnPress,
      inputActionType,
      updateItem,
      editItemIndex,
    ],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useListContext must be used within a MyListProvider');
  }
  return context;
};
