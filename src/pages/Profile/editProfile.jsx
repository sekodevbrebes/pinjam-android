import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, InputType} from '../../components';
import {ProfilUser} from '../../assets';
import {useDispatch} from 'react-redux';
import {
  setPhoto as setImage,
  setUploadStatus,
} from '../../redux/reducers/photoSlice';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {getData, showMessage, storeData} from '../../utilities';
import axios from 'axios';
import {API_HOST} from '../../config';
import {setLoading} from '../../redux/reducers/globalSlice';

const EditProfile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({
    id: '',
    name: '',
    email: '',
    instansi: '',
    address: '',
    phone: '',
  });
  const [photo, setPhoto] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getData('userProfile');
      if (profile) {
        console.log('Edit User Profile Data:', profile);
        setUserProfile(profile);
        setPhoto(profile.image ? {uri: profile.image} : null);
      }
    };
    fetchProfile();
  }, []);

  const onSubmit = async () => {
    dispatch(setLoading({isLoading: true}));
    console.log('Edit Form Data: ', userProfile);

    const payload = {
      ...userProfile,
      password: newPassword || undefined, // Only send password if it's provided
    };

    try {
      // Retrieve token from AsyncStorage
      const tokenData = await getData('token');
      if (!tokenData || !tokenData.value) {
        throw new Error('Token data is missing');
      }
      const token = tokenData.value;

      console.log('Retrieved token:', token); // Debug token value

      // Perform the API request to update profile
      // const response = await axios.post(
      //   `${API_HOST.url}/user/${userProfile.id}/update-profile`,
      //   payload,
      //   {
      //     headers: {
      //       Authorization: `${token}`, // Ensure the token is formatted correctly
      //     },
      //   },
      // );

      // console.log('API Response:', response.data); // Debug API response

      showMessage('Profile updated successfully', 'success');
      // await storeData('userProfile', response.data);
      dispatch(setLoading({isLoading: false}));
      navigation.goBack();
    } catch (error) {
      dispatch(setLoading({isLoading: false}));
      console.error('Update Profile Error:', error);
      showMessage(error.message || 'Failed to update profile', 'danger');
    }
  };

  const choosePhotoSource = () => {
    Alert.alert(
      'Select Photo',
      'Choose a photo from the gallery or take a new one',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Choose from Gallery', onPress: addPhotoFromGallery},
        {text: 'Take a Photo', onPress: addPhotoFromCamera},
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
          showMessage('User cancelled upload', 'danger');
        } else if (response.error) {
          showMessage('Upload error', 'danger');
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
          showMessage('User cancelled camera', 'danger');
        } else if (response.error) {
          showMessage('Camera error', 'danger');
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
        <View>
          <View style={styles.ContentProfile}>
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
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.instansi}>{userProfile.instansi}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.editText}>Edit Profile</Text>
          <Gap height={12} />
          <InputType
            label="Full Name"
            placeholder="Type Your Full Name"
            value={userProfile.name}
            onChangeText={value =>
              setUserProfile({...userProfile, name: value})
            }
          />
          <Gap height={20} />

          <InputType
            label="Instansi"
            placeholder="Type Your Instansi"
            value={userProfile.instansi}
            onChangeText={value =>
              setUserProfile({...userProfile, instansi: value})
            }
          />
          <Gap height={20} />

          <InputType
            label="Address"
            placeholder="Type Your Address"
            value={userProfile.alamat}
            onChangeText={value =>
              setUserProfile({...userProfile, alamat: value})
            }
          />
          <Gap height={20} />

          <InputType
            label="Phone Number"
            placeholder="Type Your Phone Number"
            value={userProfile.telephone}
            onChangeText={value =>
              setUserProfile({...userProfile, telephone: value})
            }
          />
          <Gap height={20} />

          <InputType
            label="Email Address"
            placeholder="Email Address"
            value={userProfile.email}
            editable={false}
          />
          <Gap height={24} />

          <InputType
            label="Current Password"
            placeholder="Enter Current Password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <Gap height={12} />

          <InputType
            label="New Password"
            placeholder="Enter New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Gap height={24} />

          <Button title="Save Profile" type="primary" onPress={onSubmit} />
          <Gap height={24} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  ContentProfile: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 26,
    marginBottom: 16,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
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
    borderRadius: 55,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  instansi: {
    fontSize: 14,
    color: '#8D92A3',
    textAlign: 'center',
    marginBottom: 20,
  },
  editText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#112340',
    paddingTop: 16,
    textAlign: 'center',
  },
});

export default EditProfile;
