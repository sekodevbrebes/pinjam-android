import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, InputType} from '../../components';

const SignUpAddress = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Address"
        subTitle="Please Fill Your Information more"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <InputType
          label="Instansi/Unit Kerja"
          placeholder="Type Your Instansi"
        />
        <Gap height={30} />
        <InputType
          label="Alamat Instansi :"
          placeholder="Type Your Alamat Instansi"
        />
        <Gap height={30} />
        <InputType
          label="WhatsApp Number :"
          placeholder="Type Your Phone Number"
        />
        <Gap height={36} />
        <Button
          title="Sign Up Now"
          type="primary"
          onPress={() => navigation.navigate('SignUpSuccess')}
        />
      </View>
    </View>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Poppins-Regular',
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    marginTop: 20,
    paddingTop: 42,
  },
});
