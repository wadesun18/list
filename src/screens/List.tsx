import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';

import { DARK_BLUE, GRAY } from '../constants';
import { ToDoItem, useListContext } from '../context/ListContext';
import ListItem from './components/ListItem';
import ListUpdateInput from './components/ListUpdateInput';

const ContainerWrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${GRAY};
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 10%;
  margin-left: 10%;
`;

const ToDoText = styled.Text`
  color: ${DARK_BLUE};
  font-size: 18px;
  font-weight: 600;
`;

const ListView = styled.FlatList`
  width: 100%;
`;

export default function List() {
  const { list } = useListContext();

  return (
    <ContainerWrapper>
      <TitleWrapper>
        <Octicons name="checklist" size={24} color="black" />
        <ToDoText>TODO LIST</ToDoText>
      </TitleWrapper>
      <ListView
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
          <ListUpdateInput />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ContainerWrapper>
  );
}
