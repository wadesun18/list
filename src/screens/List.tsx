import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';

import Card from '../components/Card';
import TextInput from '../components/TextInput';
import { DARK_BLUE, GRAY, GRAY_WHITE } from '../constants';
import { ToDoItem, useListContext } from '../context/ListContext';

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

const CardWrapper = styled.View`
  margin-top: 20px;
  margin-horizontal: 5%;
`;

const LeftCardWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
`;

const ItemText = styled.Text`
  color: ${DARK_BLUE};
  margin-left: 10px;
`;

const ListUpdateButtonWrapper = styled.TouchableOpacity`
  background-color: ${DARK_BLUE};
  border-radius: 10px;
  padding: 10px;
`;

const ListUpdateInputView = styled.View`
  border-width: 1px;
  margin-top: 20px;
  margin-horizontal: 5%;
`;

const ListItem = ({
  item,
  index,
  deleteItem,
}: {
  item: ToDoItem;
  index: number;
  deleteItem: (index: number) => void;
}) => {
  return (
    <CardWrapper>
      <Card
        leftComponent={
          <LeftCardWrapper>
            <Octicons name="dot-fill" size={24} color={DARK_BLUE} />
            <ItemText>{item}</ItemText>
          </LeftCardWrapper>
        }
        rightComponent={
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => deleteItem(index)}
          >
            <Ionicons name="trash" size={20} color={DARK_BLUE} />
          </TouchableOpacity>
        }
        height={50}
      />
    </CardWrapper>
  );
};

const ActionText = styled.Text`
  color: ${GRAY_WHITE};
  font-size: 16px;
  font-weight: 600;
`;

const ListUpdateButton = () => (
  <ListUpdateButtonWrapper>
    <ActionText>ADD</ActionText>
  </ListUpdateButtonWrapper>
);

const ListUpdateInput = () => {
  return (
    <ListUpdateInputView>
      <Card
        height={50}
        leftComponent={<TextInput placeholder="Enter here" width="80%" />}
        rightComponent={<ListUpdateButton />}
      />
    </ListUpdateInputView>
  );
};

export default function List() {
  const { list, deleteItem } = useListContext();
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
          <ListItem
            item={item as ToDoItem}
            index={index}
            deleteItem={deleteItem}
          />
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
