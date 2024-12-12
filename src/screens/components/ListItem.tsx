import React, { memo } from 'react';

import { TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import styled from 'styled-components/native';

import Card from '../../components/Card';
import { DARK_BLUE, HIT_SLOP, ICON_SIZE } from '../../constants';
import { ToDoItem, useListContext } from '../../context/ListContext';

const CardWrapper = styled.TouchableOpacity`
  margin-top: 20px;
  margin-horizontal: 5%;
`;

const LeftCardWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const ItemText = styled.Text`
  color: ${DARK_BLUE};
  margin-left: 10px;
`;

const ListItem = memo(({ item, index }: { item: ToDoItem; index: number }) => {
  const { deleteItem, updateItemActionOnPress } = useListContext();

  const handleDelete = () => deleteItem(index);
  const handleEdit = () => updateItemActionOnPress(index);

  return (
    <CardWrapper onPress={handleEdit}>
      <Card
        height={50}
        leftComponent={
          <LeftCardWrapper>
            <Octicons name="dot-fill" size={ICON_SIZE} color={DARK_BLUE} />
            <ItemText numberOfLines={1} ellipsizeMode="tail">
              {item}
            </ItemText>
          </LeftCardWrapper>
        }
        rightComponent={
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={handleDelete}
            accessibilityLabel="Delete item"
          >
            <Ionicons name="trash" size={ICON_SIZE} color={DARK_BLUE} />
          </TouchableOpacity>
        }
      />
    </CardWrapper>
  );
});

export default ListItem;
