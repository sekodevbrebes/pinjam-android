import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, Text, useWindowDimensions, Image, StyleSheet} from 'react-native';
import {Aula, RuangBupati, RuangCC, RuangSekda} from '../../assets';

import {useNavigation} from '@react-navigation/native';

import ListBooking from '../ListBooking';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 2,
      width: 0.2,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#F2F2F2',
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
          paddingLeft: 16,
        }}>
        {route.title}
      </Text>
    )}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <ListBooking image={Aula} />
      <ListBooking image={RuangCC} />
      <ListBooking image={RuangCC} />
    </View>
  );
};

const PastBooking = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <ListBooking image={Aula} />
    </View>
  );
};

const renderScene = SceneMap({
  1: InProgress,
  2: PastBooking,
});

const BookingTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Booking'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default BookingTab;

const styles = StyleSheet.create({
  page: {flex: 1},
});
