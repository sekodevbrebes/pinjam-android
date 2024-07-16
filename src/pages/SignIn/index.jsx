import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Logo} from '../../assets';
import {Button, Gap, InputType} from '../../components';
import useForm from '../../utilities/useForm';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setLoading} from '../../redux/reducers/globalSlice';
import {getData, ShowMessage, storeData} from '../../utilities';
import {API_HOST} from '../../config';

const SigIn = ({navigation}) => {
  const dispatch = useDispatch(); // Dapatkan dispatch dari react-redux
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    if (!form.email || !form.password) {
      ShowMessage('Please fill in all fields', 'danger');
      return;
    }

    dispatch(setLoading({isLoading: true}));
    axios
      // .post('http://10.0.2.2:8000/api/login', form)
      .post(`${API_HOST.url}/login`, form)
      .then(response => {
        const profile = response.data.user;
        const token = `${response.data.token_type} ${response.data.access_token}`;

        dispatch(setLoading({isLoading: false}));

        storeData('token', {value: token});
        storeData('userProfile', profile);
        // navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        navigation.navigate('MainApp');
      })
      .catch(response => {
        ShowMessage(response.response.data.message, 'danger');
        console.log('error', response.response.data.message);
        dispatch(setLoading({isLoading: false}));
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    </ScrollView>
  );
};

export default SigIn;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
