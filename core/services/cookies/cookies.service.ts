import * as SecureStore from 'expo-secure-store';

export async function setSecureValue<T>(key: string, value: T): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error while setting secure item:', error);
  }
}

// Obtener un valor seguro
export async function getSecureValue<T>(key: string): Promise<T | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error while getting secure item:', error);
    return null;
  }
}

// Eliminar un valor seguro
export async function deleteSecureValue(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error while deleting secure item:', error);
  }
}