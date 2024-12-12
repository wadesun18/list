import React from 'react';

import { MyListProvider } from './src/context/ListContext';
import List from './src/screens/List';

export default function App() {
  return (
    <MyListProvider>
      <List />
    </MyListProvider>
  );
}
