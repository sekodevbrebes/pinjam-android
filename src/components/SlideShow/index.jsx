import React from 'react';
import {Text, Dimensions, StyleSheet, View, Image} from 'react-native';
import {Gap, Button} from '../../components';
import {useNavigation} from '@react-navigation/native';

const index = ({image}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.child, {backgroundColor: 'tomato'}]}>
        <View style={styles.text}>
          <View style={styles.backContaner}>
            <Button
              type="icon-only"
              icon="back-light"
              style={styles.backbutton}
              onPress={() => navigation.goBack()}
            />
            <Gap width={16} />
            <View>
              <Text style={styles.title}>Detail</Text>
              <Text style={styles.subTitle}>Room Details</Text>
            </View>
          </View>
        </View>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
};

export default index;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', height: 350},
  child: {width, justifyContent: 'center'},
  text: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  backContaner: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins-medium',
    fontSize: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  subTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'semi-bold',
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: '100%',
    height: 450,
  },
});
