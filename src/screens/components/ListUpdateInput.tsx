import React, { memo, useCallback } from 'react';

import styled from 'styled-components/native';

import Card from '../../components/Card';
import TextInput from '../../components/TextInput';
import { DARK_BLUE, GRAY_WHITE } from '../../constants';
import { useListContext } from '../../context/ListContext';

const ActionText = styled.Text`
  color: ${GRAY_WHITE};
  font-size: 14px;
  font-weight: 400;
`;

const ListUpdateButtonWrapper = styled.TouchableOpacity`
  background-color: ${DARK_BLUE};
  border-radius: 10px;
  padding: 10px;
`;

const ListUpdateInputView = styled.View`
  margin-horizontal: 5%;
`;

const ListUpdateInput = () => {
  const {
    addItem,
    inputActionType,
    updateItem,
    inputTextValue,
    setInputTextValue,
  } = useListContext();

  const handleAddItem = useCallback(() => {
    if (inputActionType === 'ADD') {
      addItem(inputTextValue);
      setInputTextValue('');
      return;
    }

    updateItem();
  }, [addItem, inputActionType, inputTextValue, setInputTextValue, updateItem]);

  const ListUpdateButton = memo(() => (
    <ListUpdateButtonWrapper onPress={handleAddItem}>
      <ActionText>{inputActionType}</ActionText>
    </ListUpdateButtonWrapper>
  ));

  ListUpdateButton.displayName = 'ListUpdateButton';

  return (
    <ListUpdateInputView>
      <Card
        height={60}
        leftComponent={
          <TextInput
            placeholder="Enter here"
            width="70%"
            value={inputTextValue}
            onChangeText={setInputTextValue}
          />
        }
        rightComponent={<ListUpdateButton />}
      />
    </ListUpdateInputView>
  );
};

export default ListUpdateInput;
