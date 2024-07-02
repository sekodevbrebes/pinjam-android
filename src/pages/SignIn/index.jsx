import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Logo} from '../../assets';
import {Button, Gap, InputType} from '../../components';
import useForm from '../../utilities/useForm';

const SigIn = ({navigation}) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    console.log('form :', form);
  };

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
        value={form.email}
        onChangeText={value => setForm('email', value)}
      />
      <Gap height={36} />
      <InputType
        label="Password :"
        placeholder="Type Your Password"
        value={form.password}
        onChangeText={value => setForm('password', value)}
        secureTextEntry
      />
      <Gap height={36} />
      <Button title="Sign In" type="primary" onPress={onSubmit} />
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
