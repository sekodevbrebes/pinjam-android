import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {ProfilUser} from '../../assets';
import {ProfileTab} from '../../components';

const Profile = () => {
  return (
    <View style={styles.page}>
      <View style={styles.ContentProfile}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <Image source={ProfilUser} style={styles.photoContainer} />
          </View>
        </View>
        <Text style={styles.name}>Sus Hardianto</Text>
        <Text style={styles.instansi}>DP3KB Kabupaten Brebes</Text>
      </View>
      <View style={styles.contentContainer}>
        <ProfileTab />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  ContentProfile: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 26,
  },
  contentContainer: {
    flex: 1,
    marginTop: 18,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instansi: {fontFamily: 'Poppins-Regular', fontSize: 13, textAlign: 'center'},
});
