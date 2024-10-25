/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './navigator/Navigator';

export const ComponentsApp = ()=>{
  return (
    <NavigationContainer>{
      <Navigator />
    }</NavigationContainer>
  );
}

