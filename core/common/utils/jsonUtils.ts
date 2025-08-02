export function parseStringToJson<T>(value: string): T {
  return JSON.parse(value);
}

export function parseJsonToString<T>(value: T): string {
  return JSON.stringify(value);
}
