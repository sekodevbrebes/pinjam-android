import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {BookingTab, EmptyBooking, Header} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress} from '../../redux/action';
import {getData} from '../../utilities';

const Booking = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userLevel, setUserLevel] = useState('');
  const dispatch = useDispatch();
  const inProgress = useSelector(state => state.bookings.inProgress); // Ambil data inProgress dari state

  useEffect(() => {
    getData('userProfile')
      .then(response => {
        setUserLevel(response?.roles || '');
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getInProgress());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInProgress());
  }, [dispatch]);

  const isEmpty = inProgress.length === 0;

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Header
            title="Your Booking"
            subTitle="This is a list of your submissions"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.pageTab}>
          {isEmpty && userLevel !== 'ADMIN' ? <EmptyBooking /> : <BookingTab />}
        </View>
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  pageTab: {
    flex: 1,
    paddingTop: 16,
  },
});
