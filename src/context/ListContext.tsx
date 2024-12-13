import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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

export function MyListProvider({
  children,
  initialList = [],
}: {
  children: React.ReactNode;
  initialList?: List;
}) {
  const [list, setList] = useState<List>(initialList);
  const [inputTextValue, setInputTextValue] = useState('');
  const [inputActionType, setInputActionType] = useState<ActionType>('ADD');
  const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

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
