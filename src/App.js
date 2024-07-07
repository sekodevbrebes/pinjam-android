import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store'; // Import store yang telah dikonfigurasi
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';


const MainApp = () => {
  const {isLoading} = useSelector((state)=> state.global);
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading &&<Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
