import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IcEyeOff, IcEyeOn, Logo} from '../../assets';
import {Button, Gap, InputType} from '../../components';
import useForm from '../../utilities/useForm';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {setLoading} from '../../redux/reducers/globalSlice';
import {showMessage, storeData} from '../../utilities';
import {API_HOST} from '../../config';

const SigIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSubmit = () => {
    if (!form.email || !form.password) {
      showMessage('Silahkan isi semua !', 'danger');
      return;
    }

    dispatch(setLoading({isLoading: true}));
    axios
      .post(`${API_HOST.url}/login`, form)
      .then(response => {
        console.log('Response:', response);

        const profile = response.data.user;
        const token = `${response.data.token_type} ${response.data.access_token}`;

        dispatch(setLoading({isLoading: false}));

        storeData('token', {value: token});
        storeData('userProfile', profile);
        navigation.navigate('MainApp');
      })
      .catch(error => {
        console.log('Error:', error); // Log error untuk debugging
        console.log('Error Response:', error.response); // Log response error dari API

        let errorMessage = 'An error occurred';
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        showMessage(errorMessage, 'danger');

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
        <View style={styles.inputPasswordContainer}>
          <InputType
            label="Password :"
            placeholder="Type Your Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            onPress={toggleSecureTextEntry}
            style={styles.showHideButton}>
            {secureTextEntry ? (
              <IcEyeOn style={styles.icon} />
            ) : (
              <IcEyeOff style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>
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
  inputPasswordContainer: {
    position: 'relative',
  },
  showHideButton: {
    position: 'absolute',
    right: 10,
    top: 40, // Sesuaikan dengan posisi input
  },
  icon: {
    width: 24, // Sesuaikan ukuran icon
    height: 24, // Sesuaikan ukuran icon
  },
});
