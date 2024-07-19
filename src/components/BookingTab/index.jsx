import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {Aula, RuangCC} from '../../assets';
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
    scrollEnabled={true}
    renderLabel={({route, focused}) => (
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

const Pending = () => (
  <View style={styles.page}>
    <ListBooking image={Aula} />
    <ListBooking image={RuangCC} />
    <ListBooking image={RuangCC} />
  </View>
);

const InProgress = () => (
  <View style={styles.page}>
    <ListBooking image={Aula} />
    <ListBooking image={RuangCC} />
    <ListBooking image={RuangCC} />
  </View>
);

const Cancelled = () => (
  <View style={styles.page}>
    <ListBooking image={Aula} />
  </View>
);

const Decline = () => (
  <View style={styles.page}>
    <ListBooking image={Aula} />
  </View>
);

const Finish = () => (
  <View style={styles.page}>
    <ListBooking image={Aula} />
  </View>
);

const renderScene = SceneMap({
  1: Pending,
  2: InProgress,
  3: Cancelled,
  4: Decline,
  5: Finish,
});

const BookingTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Pending'},
    {key: '2', title: 'In Progress'},
    {key: '3', title: 'Cancelled'},
    {key: '4', title: 'Decline'},
    {key: '5', title: 'Finish'},
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
