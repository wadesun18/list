import React from 'react';

import { TextInputProps } from 'react-native';

import styled from 'styled-components/native';

import { DARK_BLUE } from '../constants';

type CustomTextInputProps = TextInputProps & {
  width?: string;
};

const StyledTextInput = styled.TextInput<{ width: string }>`
  width: ${(props) => props.width};
  height: 22px;
  border-radius: 6px;
  border-bottom-color: ${DARK_BLUE};
  border-bottom-width: 1px;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  width = '100%', // Default width is 80%
  ...rest
}) => {
  return <StyledTextInput width={width} {...rest} />;
};

export default CustomTextInput;
