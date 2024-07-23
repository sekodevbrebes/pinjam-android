import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import {BookingTab, EmptyBooking} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress} from '../../redux/action';

const Booking = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const inProgress = useSelector(state => state.bookings.inProgress); // Ambil data inProgress dari state

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getInProgress());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInProgress());
  }, [dispatch]);

  const isEmpty = inProgress.length === 0; // Tentukan apakah data kosong

  // Debugging
  useEffect(() => {
    console.log('In Progress data:', inProgress);
    console.log('Is Empty:', isEmpty);
  }, [inProgress, isEmpty]);

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Your Booking</Text>
          <Text style={styles.subTitle}>
            This is a list of your submissions
          </Text>
        </View>
        <View style={styles.pageTab}>
          {isEmpty ? <EmptyBooking /> : <BookingTab />}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#020202',
  },
  subTitle: {
    fontSize: 16,
    color: '#8D92A3',
  },
  pageTab: {
    flex: 1,
    paddingTop: 16,
  },
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
});
