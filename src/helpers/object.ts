export const pick = <T extends object, U extends keyof T>(paths: Array<U>) => (obj: T) =>
  paths.reduce((o, k) => ({ ...o, [k]: obj[k] }), {} as Partial<T>)
