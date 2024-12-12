import React from 'react';
import {
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

export type ListContent = {
  list: List | undefined;
  setList: Dispatch<SetStateAction<List | undefined>>;
  deleteItem: (index: number) => void;
};

export const MyListContext = createContext<ListContent>({
  list: undefined,
  setList: () => {},
  deleteItem: () => {},
});

const MOCK_LIST: ToDoItem[] = [
  'First Item',
  'Second Item',
  'Third Item',
  'First Item',
  'Second Item',
  'Third Item',
  'First Item',
  'Second Item',
  'Third Item',
  'First Item',
  'Second Item',
  'Third Item',
];

export function MyListProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<List | undefined>(MOCK_LIST);

  const deleteItem = useCallback(
    (index: number) => {
      if (list) {
        setList((prevList) => {
          if (!prevList) return prevList;
          return prevList.filter((_, i) => i !== index);
        });
      }
    },
    [setList],
  );

  const state = useMemo(
    () => ({
      list,
      setList,
      deleteItem,
    }),
    [list, setList, deleteItem],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => useContext(MyListContext);
