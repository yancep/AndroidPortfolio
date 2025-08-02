import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setStorageValue<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error while setting item in AsyncStorage:', error);
  }
}

export async function getStorageValue<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error while getting item from AsyncStorage:', error);
    return null;
  }
}

export async function deleteStorageValue(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error while removing item from AsyncStorage:', error);
  }
}