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

const ListActionButtonWrapper = styled.TouchableOpacity`
  background-color: ${DARK_BLUE};
  border-radius: 10px;
  padding: 10px;
`;

const ListInputView = styled.View`
  margin-horizontal: 5%;
`;

type ListActionButtonProps = {
  onPress: () => void;
  inputActionType: ActionType;
};
const ListActionButton = memo(
  ({ onPress, inputActionType }: ListActionButtonProps) => (
    <ListActionButtonWrapper onPress={onPress}>
      <ActionText>{inputActionType}</ActionText>
    </ListActionButtonWrapper>
  ),
);

ListActionButton.displayName = 'ListActionButton';

const ListInput = () => {
  const {
    addItem,
    inputActionType,
    updateItem,
    inputTextValue,
    setInputTextValue,
  } = useListContext();

  // Handle either add or update an item
  const handleOnPress = useCallback(() => {
    if (inputActionType === 'ADD') {
      addItem(inputTextValue);
      setInputTextValue('');
      return;
    }

    // when inputActionType is UPDATE
    updateItem();
  }, [addItem, inputActionType, inputTextValue, setInputTextValue, updateItem]);

  return (
    <ListInputView>
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
          <ListActionButton
            onPress={handleOnPress}
            inputActionType={inputActionType}
          />
        }
      />
    </ListInputView>
  );
};

export default ListInput;
