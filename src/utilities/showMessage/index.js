import {showMessage as showToast} from 'react-native-flash-message';

export const showMessage = (message, type = 'success') => {
  showToast({
    message,
    type: type === 'success' ? 'success' : 'danger',
    icon: type === 'success' ? 'success' : 'danger', // Menambahkan ikon sesuai dengan tipe pesan 
  });
};
