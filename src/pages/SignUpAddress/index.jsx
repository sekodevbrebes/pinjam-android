import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, InputType} from '../../components';
import {useDispatch, useSelector} from 'react-redux'; // Impor hook useDispatch dari Redux
import useForm from '../../utilities/useForm';
import axios from 'axios'; // Impor Axios

const SignUpAddress = ({navigation}) => {
  const dispatch = useDispatch(); // Menginisialisasi hook useDispatch
  const registerReducer = useSelector(state => state.register);

  const [form, setForm] = useForm({
    instansi: '',
    alamat: '',
    telephone: '',
  });

  // Fungsi untuk menangani pengiriman formulir
  const onSubmit = () => {
    console.log('form:', form); // Mencatat data formulir untuk pengujian
    const data = {
      ...form,
      ...registerReducer,
    };
    console.log('Data Register :', data);

    // Mengirim data ke endpoint register menggunakan Axios
    axios
      .post('http://10.0.2.2:8000/api/register', data)
      .then(response => {
        console.log('Data Sukses:', response.data);
        // Jika berhasil, navigasi ke layar sukses
        navigation.navigate('SignUpSuccess');
      })
      .catch(error => {
        console.log('Error registering:', error);
        // Tangani kesalahan di sini (misalnya, tampilkan pesan kesalahan kepada pengguna)
      });
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Alamat"
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
            label="WhatsApp Number :"
            placeholder="Type Your Phone Number"
            value={form.telephone}
            onChangeText={value => setForm('telephone', value)}
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
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    marginTop: 14,
    paddingTop: 42,
  },
});
