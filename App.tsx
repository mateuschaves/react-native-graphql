import 'react-native-gesture-handler';
import React from 'react';

import HomeScreen from './src/screens/HomeScreen';

import { ApolloProvider } from '@apollo/client';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import client from './src/services/apollo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}