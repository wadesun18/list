import React, { useEffect, useRef } from 'react';

import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';

import { DARK_BLUE, GRAY } from '../constants';
import { ToDoItem, useListContext } from '../context/ListContext';
import ListInput from './components/ListInput';
import ListItem from './components/ListItem';

const ContainerWrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${GRAY};
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 15%;
  margin-left: 10%;
`;

const ToDoText = styled.Text`
  color: ${DARK_BLUE};
  font-size: 18px;
  font-weight: 600;
`;

export default function List() {
  const { list } = useListContext();
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList
  const previousListLength = useRef(list.length); // Track the previous list length

  // Scroll to the end when a new item is added
  useEffect(() => {
    if (list.length > previousListLength.current) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
    previousListLength.current = list.length;
  }, [list]);

  return (
    <ContainerWrapper>
      <TitleWrapper>
        <Octicons name="checklist" size={24} color="black" />
        <ToDoText>TODO LIST</ToDoText>
      </TitleWrapper>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={list}
        renderItem={({ item, index }) => (
          <ListItem item={item as ToDoItem} index={index} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ListInput />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ContainerWrapper>
  );
}
