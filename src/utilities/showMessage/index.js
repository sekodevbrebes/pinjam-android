import { showMessage as showToast } from 'react-native-flash-message';

export const showMessage = (message, type = 'success', position = 'center') => {
  const commonStyles = {
    floating: true, // Membuat pesan muncul mengambang
    duration: 2000, // Durasi pesan dalam milidetik
    icon: type, // Menampilkan ikon sesuai tipe pesan
    titleStyle: { fontSize: 16 },
    textStyle: { fontSize: 14 },
    style: { padding: 20, borderRadius: 8 
    },
    position,
  };

  const typeStyles = {
    success: {
      backgroundColor: '#4CAF50', // Warna hijau untuk pesan sukses
    },
    danger: {
      backgroundColor: '#F44336', // Warna merah untuk pesan bahaya
    },
    info: {
      backgroundColor: '#2196F3', // Warna biru untuk pesan info
    },
  };

  showToast({
    message,
    type,
    ...commonStyles,
    ...typeStyles[type],
  });
};
