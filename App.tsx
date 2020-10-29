import 'react-native-gesture-handler';
import React from 'react';

import MarketsScreen from './src/screens/MarketsScreen';

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
          <Stack.Screen name="Markets" component={MarketsScreen} options={{
            animationEnabled: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#212121',
            },
            headerTintColor: '#b3b3b3'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}