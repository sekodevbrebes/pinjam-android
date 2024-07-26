import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, Text, useWindowDimensions, StyleSheet, Image} from 'react-native';
import ListRoom from '../ListRoom';
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect'; // Import createSelector from reselect
import {useNavigation} from '@react-navigation/native';

// URL untuk avatar online dengan inisial nama
const getDefaultAvatar = name => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return `https://ui-avatars.com/api/?name=${initials}`;
};

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

// Selector menggunakan createSelector untuk memilih ruangan berdasarkan tipe
const selectRoomsByType = createSelector(
  state => state.home.rooms,
  (_, type) => type,
  (rooms, type) => rooms.filter(room => room.type === type),
);

const RoomList = ({rooms}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      {rooms.map(itemRoom => {
        const imageArray = JSON.parse(itemRoom.image);
        const secondImage = imageArray[1];
        const imageUri = secondImage
          ? {uri: secondImage}
          : {uri: getDefaultAvatar(itemRoom.name)};

        return (
          <ListRoom
            key={itemRoom.id}
            image={imageUri}
            name={itemRoom.name}
            rating={itemRoom.rate}
            location={itemRoom.location}
            onPress={() => navigation.navigate('RoomDetail', {itemRoom})}
          />
        );
      })}
    </View>
  );
};

const HomeTab = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const rooms = useSelector(state => state.home.rooms);
  const popularRooms = useSelector(state =>
    selectRoomsByType(state, 'Popular'),
  );
  const recommendedRooms = useSelector(state =>
    selectRoomsByType(state, 'Recommended'),
  );

  const renderScene = SceneMap({
    1: () => <RoomList rooms={rooms} />,
    2: () => <RoomList rooms={popularRooms} />,
    3: () => <RoomList rooms={recommendedRooms} />,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Room'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
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

const styles = StyleSheet.create({
  page: {flex: 1},
});

export default HomeTab;
