import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, Text } from 'react-native';

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
      try {
        // Check if the device supports biometric authentication
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
          Alert.alert(
            'Unsupported Device',
            'Your device does not support biometric authentication.',
          );
          setIsCheckingAuth(false);
          return;
        }

        // Check if Face ID or biometrics are enrolled
        const isBiometricAvailable =
          await LocalAuthentication.isEnrolledAsync();
        if (!isBiometricAvailable) {
          Alert.alert(
            'Biometric Not Set Up',
            'Please set up Face ID or a biometric method in your device settings.',
          );
          setIsCheckingAuth(false);
          return;
        }

        // Prompt biometric authentication
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Unlock App with biometirc method or passcode',
          cancelLabel: 'Cancel',
        });

        setIsAuthenticated(result.success);
      } catch (error) {
        console.error('Authentication error:', error);
        Alert.alert('Error', 'An error occurred during authentication.');
      } finally {
        setIsCheckingAuth(false);
      }
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
          <Text>Access Denied</Text>
        </ContainerWrapper>
      )}
    </MyListProvider>
  );
}
