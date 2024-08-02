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
import {showMessage} from '../../utilities';
import {IcEyeOff, IcEyeOn} from '../../assets';

const SignUp = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [photo, setPhoto] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  const dispatch = useDispatch();

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureTextEntryConfirm = () => {
    setSecureTextEntryConfirm(!secureTextEntryConfirm);
  };

  const onSubmit = () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.password_confirmation
    ) {
      showMessage('Silahkan isi semua !', 'danger');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showMessage('Format Email Tidak Benar', 'danger');
      return;
    }

    if (form.password !== form.password_confirmation) {
      showMessage('Password Tidak Sesuai', 'danger');
      return;
    }

    if (!photo) {
      showMessage('Tambahkan Foto', 'danger');
      return;
    }

    dispatch(setRegister(form));
    navigation.navigate('SignUpAddress');
  };

  const choosePhotoSource = () => {
    Alert.alert(
      'Pilih Foto',
      'Pilih foto dari galeri atau ambil foto baru',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pilih dari Gallery',
          onPress: () => addPhotoFromGallery(),
        },
        {
          text: 'dari Camera',
          onPress: () => addPhotoFromCamera(),
        },
      ],
      {cancelable: true},
    );
  };

  const addPhotoFromGallery = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: false,
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          showMessage('User cancelled Upload', 'danger');
        } else if (response.error) {
          showMessage('Upload Error');
        } else if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

          setPhoto(source);
          dispatch(setImage(dataImage));
          dispatch(setUploadStatus({isUploadPhoto: true}));
        } else {
          showMessage('No image selected', 'danger');
        }
      },
    );
  };

  const addPhotoFromCamera = () => {
    launchCamera(
      {
        quality: 0.5,
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: false,
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          showMessage('User cancelled Camera', 'danger');
        } else if (response.error) {
          showMessage('Camera Error');
        } else if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

          setPhoto(source);
          dispatch(setImage(dataImage));
          dispatch(setUploadStatus({isUploadPhoto: true}));
        } else {
          showMessage('No image captured', 'danger');
        }
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.page}>
        <Header
          title="Sign Up"
          subTitle="Register dan Ajukan Permohonan"
          onPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          <View style={styles.photo}>
            <TouchableOpacity onPress={choosePhotoSource}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.textPhoto}>Add Photo</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <InputType
            label="Nama Lengkap"
            placeholder="Masukan Nama Lengkap"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={20} />
          <InputType
            label="Email Address"
            placeholder="Masukan Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={20} />
          <View style={styles.inputPasswordContainer}>
            <InputType
              label="Password"
              placeholder="Masukan Password"
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
          <Gap height={20} />
          <View style={styles.inputPasswordContainer}>
            <InputType
              label="Confirm Password"
              placeholder="Ketik Ulang Password"
              value={form.password_confirmation}
              onChangeText={value => setForm('password_confirmation', value)}
              secureTextEntry={secureTextEntryConfirm}
            />
            <TouchableOpacity
              onPress={toggleSecureTextEntryConfirm}
              style={styles.showHideButton}>
              {secureTextEntryConfirm ? (
                <IcEyeOn style={styles.icon} />
              ) : (
                <IcEyeOff style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
          <Gap height={24} />
          <Button title="Continue" type="primary" onPress={onSubmit} />
          <Gap height={18} />
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
