import axios from 'axios';
import {
    showMessage,
    storeData
} from '../../utilities';
import {
    API_HOST
} from '../../config';
import {
    setUploadStatus
} from '../reducers/photoSlice';
import {
    setLoading
} from '../reducers/globalSlice';
import {
    clearRegisterState
} from '../reducers/registerSlice';

export const signUpAction = (data, photo, navigation) => async (dispatch) => {
    dispatch(setLoading({
        isLoading: true
    }));

    try {
        if (!data || !photo) {
            throw new Error("Data or photo is undefined");
        }

        const response = await axios.post(`${API_HOST.url}/register`, data);


        if (!response.data || !response.data.user || !response.data.access_token) {
            throw new Error("Invalid response from server");
        }

        const profile = response.data.user;
        const token = `${response.data.token_type} ${response.data.access_token}`;


        await storeData('tokenData', {
            value: token
        });


        if (photo.isUploadPhoto) {
            const photoForUpload = new FormData();
            if (!photo.uri || !photo.type || !photo.name) {
                throw new Error("Invalid photo data");
            }



            photoForUpload.append('image', {
                uri: photo.uri,
                type: photo.type,
                name: photo.name,
            });


            const resUpload = await axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });


        }

        await storeData('userProfile', profile);
        dispatch(setLoading({
            isLoading: false
        }));

        navigation.reset({
            index: 0,
            routes: [{
                name: 'SignUpSuccess'
            }],
        });

        dispatch(clearRegisterState());
        dispatch(setUploadStatus(false));
    } catch (error) {
        dispatch(setLoading({
            isLoading: false
        }));

        showMessage(error.message || 'Gagal registrasi', 'danger');
    }
};