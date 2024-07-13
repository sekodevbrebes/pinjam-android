import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowMessage } from '../showMessage';

export const storeData = async (storageKey, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
      ShowMessage('failed to save in local storage','danger')
    }
};


export const getData = async (storageKey) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        ShowMessage('failed to retrieve local storage','danger')
    }
  };