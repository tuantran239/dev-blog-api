type Type =
  | 'boolean'
  | 'number'
  | 'string'
  | 'function'
  | 'array'
  | 'date'
  | 'regExp'
  | 'undefined'
  | 'null'
  | 'object'

export const checkType = (val: any, type: Type) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type
}
