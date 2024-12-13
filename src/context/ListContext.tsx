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
  setList: Dispatch<SetStateAction<List>>;
  deleteItem: (index: number) => void;
  addItem: (newItem: ToDoItem) => void;
  updateItem: () => void;
  inputTextValue: string;
  setInputTextValue: Dispatch<SetStateAction<string>>;
  updateItemActionOnPress: (index: number) => void;
  inputActionType: ActionType;
  setInputActionType: Dispatch<SetStateAction<ActionType>>;
  editItemIndex: number | undefined;
  setEditItemIndex: Dispatch<SetStateAction<number | undefined>>;
};

export const MyListContext = createContext<ListContent>({
  list: [],
  setList: () => {},
  deleteItem: () => {},
  addItem: () => {},
  inputTextValue: '',
  setInputTextValue: () => {},
  updateItemActionOnPress: () => {},
  inputActionType: 'ADD',
  setInputActionType: () => {},
  updateItem: () => {},
  editItemIndex: undefined,
  setEditItemIndex: () => {},
});

const MOCK_LIST: ToDoItem[] = [
  'First Item',
  'Second Item',
  'Third Item',
  'Fourth Item',
];

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const [inputActionType, setInputActionType] = useState<ActionType>('ADD');
  const [inputTextValue, setInputTextValue] = useState('');
  const [editItemIndex, setEditItemIndex] = useState<number | undefined>(
    undefined,
  );
  const [list, setList] = useState<List>(MOCK_LIST);

  const deleteItem = useCallback(
    (index: number) => {
      setInputActionType('ADD');
      setInputTextValue('');
      setList((prevList) => prevList.filter((_, i) => i !== index));
    },
    [setList],
  );

  const addItem = useCallback(
    (newItem: ToDoItem) => {
      if (!newItem.trim()) return;
      setList((prevList) => [...prevList, newItem.trim()]);
    },
    [setList],
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
    if (!inputTextValue) return;

    setList((prevList) => {
      return prevList.map((item, i) =>
        i === editItemIndex ? inputTextValue : item,
      );
    });

    setInputTextValue('');
    setEditItemIndex(undefined);
    setInputActionType('ADD');
  }, [editItemIndex, inputTextValue]);

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
      setList,
      addItem,
      deleteItem,
      inputTextValue,
      setInputTextValue,
      inputActionType,
      setInputActionType,
      updateItemActionOnPress,
      updateItem,
      editItemIndex,
      setEditItemIndex,
    ],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => useContext(MyListContext);
