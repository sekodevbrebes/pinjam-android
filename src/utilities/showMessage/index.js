import { showMessage as showToast } from 'react-native-flash-message';

export const showMessage = (message, type = 'success', position = 'center') => {
  const commonStyles = {
    floating: true,
    duration: 2000,
    icon: type, 
    titleStyle: { fontSize: 16 },
    textStyle: { fontSize: 14 },
    style: { padding: 20, borderRadius: 8 
    },
    position,
  };

  const typeStyles = {
    success: {
      backgroundColor: '#4CAF50',
    },
    danger: {
      backgroundColor: '#F44336',
    },
    info: {
      backgroundColor: '#2196F3', 
    },
  };

  showToast({
    message,
    type,
    ...commonStyles,
    ...typeStyles[type],
  });
};
