import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, InputType} from '../../components';
import {Link} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import useForm from '../../utilities/useForm';
import {setRegister} from '../../redux/reducers/registerSlice';

const SignUp = ({navigation}) => {
  // Inisialisasi state form menggunakan custom hook useForm
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Inisialisasi dispatch
  const dispatch = useDispatch();

  // Fungsi untuk menangani submit form
  const onSubmit = () => {
    console.log('form : ', form);
    // Memeriksa apakah password dan confirmPassword sama
    if (form.password !== form.password_confirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Dispatch aksi register
    dispatch(setRegister(form));

    // Navigasi ke layar berikutnya jika validasi berhasil
    navigation.navigate('SignUpAddress');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.page}>
        {/* Komponen Header dengan judul dan subjudul */}
        <Header
          title="Sign Up"
          subTitle="Register dan Ajukan Permohoan"
          onPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          {/* Placeholder untuk menambahkan foto */}
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              <View style={styles.photoContainer}>
                <Text style={styles.textPhoto}>Add Photo</Text>
              </View>
            </View>
          </View>

          {/* Input untuk Nama Lengkap */}
          <InputType
            label="Full Name"
            placeholder="Type Your Full Name"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={20} />
          {/* Input untuk Alamat Email */}
          <InputType
            label="Email Address"
            placeholder="Type Your Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={20} />
          {/* Input untuk Password */}
          <InputType
            label="Password"
            placeholder="Type Your Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={20} />
          {/* Input untuk Konfirmasi Password */}
          <InputType
            label="Confirm Password"
            placeholder="Confirm Your Password"
            value={form.password_confirmation}
            onChangeText={value => setForm('password_confirmation', value)}
            secureTextEntry
          />
          <Gap height={24} />
          {/* Tombol Continue untuk submit form */}
          <Button title="Continue" type="primary" onPress={onSubmit} />
          <Gap height={18} />
          {/* Teks footer dengan navigasi ke layar Sign In */}
          <Text style={styles.footer}>
            Sudah Punya Akun?{' '}
            <Text
              style={styles.login}
              onPress={() => navigation.navigate('SignIn')}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  login: {
    fontWeight: 'bold',
    color: 'black',
  },
  footer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    marginBottom: 36,
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
    marginTop: 28,
    marginBottom: 16,
  },
});
