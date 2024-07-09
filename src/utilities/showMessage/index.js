
import {showMessage as showToast} from 'react-native-flash-message';


export const ShowMessage = (message, type) => {
    showToast({
      message,
      type: type === 'success' ? 'success' : 'danger',
    });
  };