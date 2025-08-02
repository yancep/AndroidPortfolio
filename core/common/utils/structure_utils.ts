/**
 * @description valida si un string es nulo o vacio
 * @return {true} si es nulo o vacio
 * @return {false} si no es nulo o vacio
 * */
export function IsStringOrNull(value: string): boolean {
  return !value || value === '';
}

/**
 * @description Función que retorna el valor del enum según el key
 * @param {enumObject}
 * @param {value}
 * @returns {value}
 */
export function getEnumValueByKey<T>(enumObject: T, key: keyof T): T[keyof T] {
  return enumObject[key];
}

/**
 * @description Función que retorna el key del enum según el valor
 * @param enumObject
 * @param value
 * @returns
 */
export function getEnumKeyByValue<T>(
  enumObject: T,
  value: T[keyof T],
): string | undefined {
  return Object.keys(enumObject as any).find(
    (key) => enumObject[key as keyof T] === value,
  );
}
