import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Button, Gap, Header, InputType} from '../../components';
import {useDispatch} from 'react-redux';
import useForm from '../../utilities/useForm';
import {setRegister} from '../../redux/reducers/registerSlice';
import {
  setPhoto as setImage,
  setUploadStatus,
} from '../../redux/reducers/photoSlice';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {ShowMessage} from '../../utilities';

const SignUp = ({navigation}) => {
  // Inisialisasi state form menggunakan custom hook useForm
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Inisialisasi state untuk menyimpan foto yang dipilih
  const [photo, setPhoto] = useState(null);

  // Inisialisasi dispatch
  const dispatch = useDispatch();

  // Fungsi untuk menangani submit form
  const onSubmit = () => {
    console.log('Form Data: ', form);

    // Validasi form
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.password_confirmation
    ) {
      ShowMessage('Please fill in all fields', 'danger');
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      ShowMessage('Invalid email format', 'danger');
      return;
    }

    // Memeriksa apakah password dan password_confirmation sama
    if (form.password !== form.password_confirmation) {
      ShowMessage('Passwords do not match', 'danger');
      return;
    }

    // Dispatch aksi register dengan data form
    dispatch(setRegister(form));

    // Navigasi ke layar SignUpAddress jika validasi berhasil
    navigation.navigate('SignUpAddress');
  };

  // Fungsi untuk memilih foto dari galeri atau kamera
  const choosePhotoSource = () => {
    Alert.alert(
      'Select Photo',
      'Choose a photo from the gallery or take a new one',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Choose from Gallery',
          onPress: () => addPhotoFromGallery(),
        },
        {
          text: 'Take a Photo',
          onPress: () => addPhotoFromCamera(),
        },
      ],
      {cancelable: true},
    );
  };

  // Fungsi untuk membuka galeri dan menambahkan foto
  const addPhotoFromGallery = () => {
    console.log('Opening gallery...');
    launchImageLibrary(
      {
        quality: 0.5,
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: false,
        mediaType: 'photo',
      },
      response => {
        console.log('Gallery Response: ', response);
        if (response.didCancel) {
          ShowMessage('User cancelled Upload', 'danger');
        } else if (response.error) {
          ShowMessage('Upload Error');
        } else if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          console.log('Selected Image Data: ', dataImage);
          setPhoto(source);
          dispatch(setImage(dataImage));
          dispatch(setUploadStatus({isUploadPhoto: true}));
        } else {
          ShowMessage('No image selected', 'danger');
        }
      },
    );
  };

  // Fungsi untuk membuka kamera dan menambahkan foto
  const addPhotoFromCamera = () => {
    console.log('Opening camera...');
    launchCamera(
      {
        quality: 0.5,
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: false,
        mediaType: 'photo',
      },
      response => {
        console.log('Camera Response: ', response);
        if (response.didCancel) {
          ShowMessage('User cancelled Camera', 'danger');
        } else if (response.error) {
          ShowMessage('Camera Error');
        } else if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          console.log('Captured Image Data: ', dataImage);
          setPhoto(source);
          dispatch(setImage(dataImage));
          dispatch(setUploadStatus({isUploadPhoto: true}));
        } else {
          ShowMessage('No image captured', 'danger');
        }
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.page}>
        {/* Komponen Header dengan judul dan subjudul */}
        <Header
          title="Sign Up"
          subTitle="Register dan Ajukan Permohonan"
          onPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          {/* Placeholder untuk menambahkan foto */}
          <View style={styles.photo}>
            <TouchableOpacity onPress={choosePhotoSource}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  // Menampilkan foto yang dipilih
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  // Menampilkan teks Add Photo jika belum ada foto yang dipilih
                  <View style={styles.photoContainer}>
                    <Text style={styles.textPhoto}>Add Photo</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
              onPress={() => navigation.navigate('SigIn')}>
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
    width: 95,
    height: 95,
    borderRadius: 45,
    backgroundColor: '#F0F0F0',
  },
  textPhoto: {
    textAlign: 'center',
    lineHeight: 90,
    color: '#8D92A3',
  },
  borderPhoto: {
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 0.5,
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
