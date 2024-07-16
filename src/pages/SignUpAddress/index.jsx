import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, InputType} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import useForm from '../../utilities/useForm';
import axios from 'axios';
import {setLoading} from '../../redux/reducers/globalSlice';
import {ShowMessage, storeData} from '../../utilities';
import {
  setRegister,
  clearRegisterState,
} from '../../redux/reducers/registerSlice';
import {setPhoto, setUploadStatus} from '../../redux/reducers/photoSlice';
import {API_HOST} from '../../config';

const SignUpAddress = ({navigation}) => {
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);
  const photo = useSelector(state => state.photo);

  const [form, setForm] = useForm({
    instansi: '',
    alamat: '',
    telephone: '',
  });

  const onChangeTelephone = value => {
    // Hanya memperbolehkan angka
    const phoneRegex = /^[0-9]*$/;
    if (phoneRegex.test(value)) {
      setForm('telephone', value);
    }
  };

  const onSubmit = () => {
    // Validasi form
    if (!form.instansi || !form.alamat || !form.telephone) {
      ShowMessage('Please fill in all fields', 'danger');
      return;
    }

    // Validasi nomor telepon hanya berupa angka
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(form.telephone)) {
      ShowMessage('Phone number should contain only numbers', 'danger');
      return;
    }
    const data = {
      ...form,
      ...register,
    };

    dispatch(setLoading({isLoading: true}));

    axios
      // .post('http://10.0.2.2:8000/api/register', data)
      .post(`${API_HOST.url}/register`, data)
      .then(response => {
        const profile = response.data.user;
        const token = `${response.data.token_type} ${response.data.access_token}`;

        storeData('tokenData', {value: token});

        console.log('Data Sukse :', response.data);
        if (photo.isUploadPhoto) {
          const photoForUpload = new FormData();
          photoForUpload.append('image', {
            uri: photo.uri,
            type: photo.type,
            name: photo.name,
          });

          axios
            .post(`${API_HOST.url}/user/photo`, photoForUpload, {
              headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(resUpload => {
              console.log('Photo Sukses :', resUpload);
              profile.profile_photo_url = `http://10.0.2.2:8000/storage/${resUpload.data.data[0]}`;
              storeData('userProfile', profile);
              dispatch(setLoading({isLoading: false}));
              // ShowMessage('Register Success');
              navigation.reset({index: 0, routes: [{name: ''}]});
            })
            .catch(err => {
              dispatch(setLoading({isLoading: false}));
              console.log('Eroor Upload', err);
              navigation.reset({
                index: 0,
                routes: [{name: 'SignUpSuccess'}],
              });
            });
        } else {
          storeData('userProfile', profile);
          dispatch(setLoading({isLoading: false}));
          // ShowMessage('Register Success');
          navigation.reset({
            index: 0,
            routes: [{name: 'SignUpSuccess'}],
          });
        }
        dispatch(clearRegisterState());
        dispatch(setUploadStatus(false));
      })
      .catch(error => {
        dispatch(setLoading({isLoading: false}));
        ShowMessage(error.response.data.message, 'danger');
      });
  };

  return (
    <ScrollView style={styles.scrollContainer}>
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
            value={form.instansi}
            onChangeText={value => setForm('instansi', value)}
          />
          <Gap height={30} />
          <InputType
            label="Address :"
            placeholder="Type Your Address Instansi"
            value={form.alamat}
            onChangeText={value => setForm('alamat', value)}
          />
          <Gap height={30} />
          <InputType
            label="Telephone :"
            placeholder="Type Your Phone Number"
            value={form.telephone}
            onChangeText={onChangeTelephone}
            keyboardType="numeric"
          />

          <Gap height={36} />
          <Button title="Sign Up Now" type="primary" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpAddress;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    marginTop: 14,
    paddingTop: 42,
  },
});
