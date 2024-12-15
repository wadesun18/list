import React, { memo, useCallback } from 'react';

import styled from 'styled-components/native';

import Card from '../../components/Card';
import CustomTextInput from '../../components/CustomTextInput';
import { DARK_BLUE, GRAY_WHITE } from '../../constants';
import { ActionType, useListContext } from '../../context/ListContext';

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

type ListUpdateButtonProps = {
  onPress: () => void;
  inputActionType: ActionType;
};
const ListUpdateButton = memo(
  ({ onPress, inputActionType }: ListUpdateButtonProps) => (
    <ListUpdateButtonWrapper onPress={onPress}>
      <ActionText>{inputActionType}</ActionText>
    </ListUpdateButtonWrapper>
  ),
);

ListUpdateButton.displayName = 'ListUpdateButton';

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

  return (
    <ListUpdateInputView>
      <Card
        height={60}
        leftComponent={
          <CustomTextInput
            placeholder="Enter here"
            width="70%"
            value={inputTextValue}
            onChangeText={setInputTextValue}
          />
        }
        rightComponent={
          <ListUpdateButton
            onPress={handleAddItem}
            inputActionType={inputActionType}
          />
        }
      />
    </ListUpdateInputView>
  );
};

export default ListUpdateInput;
