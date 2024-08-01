import axios from 'axios';
import { showMessage, storeData } from '../../utilities';
import { API_HOST } from '../../config';
import { setUploadStatus } from '../reducers/photoSlice';
import { setLoading } from '../reducers/globalSlice';
import { clearRegisterState } from '../reducers/registerSlice';

export const signUpAction = (data, photo, navigation) => async (dispatch) => {
    dispatch(setLoading({ isLoading: true }));

    try {
        if (!data || !photo) {
            throw new Error("Data atau foto tidak tersedia");
        }

        const response = await axios.post(`${API_HOST.url}/register`, data);

        if (!response.data || !response.data.user || !response.data.access_token) {
            throw new Error("Respons dari server tidak valid");
        }

        const profile = response.data.user;
        const token = `${response.data.token_type} ${response.data.access_token}`;

        await storeData('tokenData', { value: token });

        if (photo.isUploadPhoto) {
            const photoForUpload = new FormData();
            if (!photo.uri || !photo.type || !photo.name) {
                throw new Error("Data foto tidak valid");
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
        dispatch(setLoading({ isLoading: false }));

        navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpSuccess' }],
        });

        dispatch(clearRegisterState());
        dispatch(setUploadStatus(false));
    } catch (error) {
        dispatch(setLoading({ isLoading: false }));

        let errorMessage = 'Gagal registrasi';

        // Menangani error dari API
        if (error.response && error.response.data) {
            const apiError = error.response.data;

            if (apiError.error) {
                // Pesan error umum dari API
                errorMessage = apiError.error;
            } else if (apiError.errors) {
                // Pesan error validasi
                const validationErrors = apiError.errors;
                if (validationErrors.email) {
                    errorMessage = validationErrors.email.join(', '); // Menggabungkan pesan error jika ada beberapa
                }
            }
        } else if (error.message) {
            // Pesan error dari error JavaScript
            errorMessage = error.message;
        }

        showMessage(errorMessage, 'danger');
    }
};
