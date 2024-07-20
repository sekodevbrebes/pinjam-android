import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {EmptyImg} from '../../assets';

const NoAgenda = () => (
  <View style={styles.noAgendaContainer}>
    <Image source={EmptyImg} style={styles.noAgendaImage} />
    <Text style={styles.noAgendaText}>No Agenda for today.</Text>
  </View>
);

const styles = StyleSheet.create({
  noAgendaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noAgendaImage: {
    width: 250,
    height: 250,
    marginBottom: 4,
  },
  noAgendaText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default NoAgenda;
