import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListAccount from '../ListAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 2,
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

const Account = () => {
  const navigation = useNavigation();
  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(['userProfile', 'token']);
      navigation.reset({
        index: 0,
        routes: [{name: 'GetStarted'}],
      });
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <View style={styles.page}>
      <ListAccount name="Edit Profile" />
      <ListAccount name="Sign Out" onPress={signOut} />
    </View>
  );
};

const About = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <ListAccount
        name="Help Center"
        onPress={() => navigation.navigate('HelpCenter')}
      />
      <ListAccount
        name="Terms & Conditions"
        onPress={() => navigation.navigate('Tos')}
      />
    </View>
  );
};

const renderScene = SceneMap({
  1: Account,
  2: About,
});

const ProfileTab = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    {key: '2', title: 'About'},
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

export default ProfileTab;

const styles = StyleSheet.create({
  page: {paddingTop: 10},
});
