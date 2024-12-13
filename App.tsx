import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Text } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import styled from 'styled-components/native';

import { MyListProvider } from './src/context/ListContext';
import List from './src/screens/List';

const ContainerWrapper = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function authenticate() {
      const result = await LocalAuthentication.authenticateAsync();
      setIsAuthenticated(result.success);
      setIsCheckingAuth(false);
    }

    authenticate();
  }, []);

  if (isCheckingAuth) {
    return (
      <ContainerWrapper>
        <ActivityIndicator size="large" color="#0000ff" />
      </ContainerWrapper>
    );
  }

  return (
    <MyListProvider>
      {isAuthenticated ? (
        <List />
      ) : (
        <ContainerWrapper>
          <Text>
            Access Denied: Please go to settings and set up your device
            authentication
          </Text>
        </ContainerWrapper>
      )}
    </MyListProvider>
  );
}
