import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, Text, useWindowDimensions, Image, StyleSheet} from 'react-native';
import {Aula, RuangBupati, RuangCC, RuangSekda} from '../../assets';
import ListRoom from '../ListRoom';

import {useNavigation} from '@react-navigation/native';

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

const Ruangan = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <ListRoom
        image={Aula}
        onPress={() => navigation.navigate('RoomDetail')}
      />
      <ListRoom
        image={RuangBupati}
        onPress={() => navigation.navigate('RoomDetail')}
      />
      <ListRoom
        image={RuangCC}
        onPress={() => navigation.navigate('RoomDetail')}
      />
      <ListRoom
        image={RuangSekda}
        onPress={() => navigation.navigate('RoomDetail')}
      />
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <ListRoom
        image={Aula}
        onPress={() => navigation.navigate('RoomDetail')}
      />
      <ListRoom
        image={RuangBupati}
        onPress={() => navigation.navigate('RoomDetail')}
      />
      <ListRoom
        image={RuangCC}
        onPress={() => navigation.navigate('RoomDetail')}
      />
      <ListRoom
        image={RuangSekda}
        onPress={() => navigation.navigate('RoomDetail')}
      />
    </View>
  );
};

const renderScene = SceneMap({
  1: Ruangan,
  2: Popular,
});

const HomeTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Ruang'},
    {key: '2', title: 'Popular'},
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

export default HomeTab;

const styles = StyleSheet.create({
  page: {paddingTop: 10},
});
