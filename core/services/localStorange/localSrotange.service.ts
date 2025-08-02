export function setLocalStorageValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error while setting item in localStorage:', error);
  }
}

export function getLocalStorageValue<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error while getting item from localStorage:', error);
    return null;
  }
}

export function deleteLocalStorageValue(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error while removing item from localStorage:', error);
  }
}