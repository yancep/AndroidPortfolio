import { SessionModel } from '@/features/users/domain/entities/Session';
import * as SecureStore from 'expo-secure-store';

export interface TokenService {
  setSessionInStorage(session?: SessionModel): Promise<void>;

  getSessionFromStorage(): Promise<SessionModel | null>;

  removeSession(): Promise<void>;
}

export const TokenServiceImpl = (): TokenService => ({
  async setSessionInStorage(session: SessionModel): Promise<void> {
    try {
      await SecureStore.setItemAsync('session', JSON.stringify(session));
    } catch (error) {
      console.error('Error while setting session in storage:', error);
    }
  },

  async getSessionFromStorage(): Promise<SessionModel | null> {
    try {
      const sessionValue = await SecureStore.getItemAsync('session');
      return sessionValue ? JSON.parse(sessionValue) : null;
    } catch (error) {
      console.error('Error while getting session from storage:', error);
      return null;
    }
  },

  async removeSession(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('session');
    } catch (error) {
      console.error('Error while removing session from storage:', error);
    }
  },
});

export const TokenServiceSymbols = {
  TOKEN_SERVICE: Symbol('TokenServiceImpl'),
};