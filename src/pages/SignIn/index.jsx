import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Logo} from '../../assets';
import {Button, Gap, InputType} from '../../components';

const SigIn = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Image style={styles.image} source={Logo} />
      <Text style={styles.title}>
        Masuk & Mulai {'\n'}
        Mengajukan Pinjam Tempat
      </Text>
      <InputType
        label="Email Address :"
        placeholder="Type Your Email Address"
      />
      <Gap height={36} />
      <InputType label="Password :" placeholder="Type Your Password" />
      <Gap height={36} />
      <Button
        title="Sign In"
        type="primary"
        onPress={() => navigation.navigate('Home')}
      />
      <View style={{height: 20}} />
      <Button
        title="Create New Account"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default SigIn;

const styles = StyleSheet.create({
  page: {
    padding: 24,
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    marginTop: 24,
    marginBottom: 60,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
});
