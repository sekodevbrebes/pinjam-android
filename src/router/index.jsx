import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  GetStarted,
  SigIn,
  SignUp,
  SignUpAddress,
  SignUpSuccess,
  Splash,
  Home,
  Booking,
  Profile,
  RoomDetail,
  DetailRuangan,
  BookingDate,
  Agenda,
  SuccessBooking,
  DetailBooking,
} from '../pages';
import {BottomNavigator, Tos} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigIn"
        component={SigIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpSuccess"
        component={SignUpSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailRuangan"
        component={DetailRuangan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingDate"
        component={BookingDate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessBooking"
        component={SuccessBooking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailBooking"
        component={DetailBooking}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Tos" component={Tos} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default Router;
