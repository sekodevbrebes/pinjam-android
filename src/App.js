import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import { Logo } from './assets/icon';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
