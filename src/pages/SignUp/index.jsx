import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, InputType} from '../../components';
import {Link} from '@react-navigation/native';

const SignUp = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Sign Up"
        subTitle="Register dan Ajukan Permohoan"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <View style={styles.photoContainer}>
              <Text style={styles.textPhoto}>Add Photo</Text>
            </View>
          </View>
        </View>
        <InputType label="Full Name" placeholder="Type Your Full Name" />
        <Gap height={30} />
        <InputType
          label="Email Address :"
          placeholder="Type Your Email Address"
        />
        <Gap height={30} />
        <InputType label="Password :" placeholder="Type Your Password" />
        <Gap height={36} />
        <Button
          title="Continue"
          type="primary"
          onPress={() => navigation.navigate('SignUpAddress')}
        />
        <Gap height={36} />
        <Text style={styles.footer}>
          Sudah Punya Akun?{' '}
          <Text
            style={styles.login}
            onPress={() => navigation.navigate('SigIn')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  login: {
    fontWeight: 'bold',
    color: 'black',
  },
  footer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    marginTop: 14,
    flex: 1,
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  textPhoto: {
    textAlign: 'center',
  },
  borderPhoto: {
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: '#8D92A3',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
});
