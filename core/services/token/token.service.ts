// import { SessionModel } from '@/features/users/domain/entities/Session';
// import { deleteCookie, getCookie, setCookie } from 'cookies-next';

// export interface TokenService {
//   setSessionInCookies(session?: SessionModel): void;

//   getSessionInCookies(): SessionModel | null;

//   removeSession(): void;
// }

// export const TokenServiceImpl = (): TokenService => ({
//   setSessionInCookies(session: SessionModel): void {
//     try {
//       setCookie('session', JSON.stringify(session), {
//         maxAge: 60 * 60 * 24 * 1,
//       });
//     } catch (error) {
//       console.error('Error while setting item in cookies:', error);
//     }
//   },

//   getSessionInCookies(): SessionModel | null {
//     const cookieValue = getCookie('session');
//     return cookieValue ? JSON.parse(cookieValue as string) : null;
//   },

//   removeSession(): void {
//     deleteCookie('session');
//   },
// });

// export const TokenServiceSymbols = {
//   TOKEN_SERVICE: Symbol('TokenServiceImpl'),
// };
