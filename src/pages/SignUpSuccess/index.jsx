import React from 'react';

import {StyleSheet, View, Text, Image} from 'react-native';
import {Button} from '../../components';
import {SuccessRegisteration} from '../../assets';

const SignUpSuccess = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={SuccessRegisteration} />
      <Text style={styles.title}>Registration successful</Text>
      <Text style={styles.subtitle}>
        To start using the application, please log in first and then submit a
        request.
      </Text>
      <Button
        style={styles.button}
        title="Sign In"
        type="primary"
        onPress={() => navigation.replace('SigIn')}
      />
    </View>
  );
};

export default SignUpSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 70,
  },
  title: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 363,
    alignSelf: 'center',
    marginBottom: 40,
  },
  subtitle: {
    textAlign: 'center',
    color: '#8D92A3',
    marginTop: 6,
    marginBottom: 40,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingRight: 200,
    flex: 1,
    backgroundColor: 'yellow',
  },
});
