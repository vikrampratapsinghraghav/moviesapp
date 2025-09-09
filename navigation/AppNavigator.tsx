import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { Movie } from '../types/Movie';

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#111111',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Movies',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#111111',
          }}
        />
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetailScreen}
          options={({ route }) => ({ 
            title: 'Movie Details',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#111111',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
