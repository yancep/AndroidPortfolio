// import { deleteCookie, getCookie, setCookie } from 'cookies-next';

// export function setCookieValue<T>(key: string, value: T): void {
//   try {
//     setCookie(key, JSON.stringify(value), {
//       maxAge: 60 * 60 * 24 * 1,
//     });
//   } catch (error) {
//     console.error('Error while setting item in cookies:', error);
//   }
// }

// export function getCookieValue<T>(key: string): T | null {
//   const cookieValue = getCookie(key);
//   return cookieValue ? JSON.parse(cookieValue as string) : null;
// }

// export function deleteCookieValues(key: string) {
//   deleteCookie(key);
// }
