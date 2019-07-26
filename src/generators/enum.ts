import { propEq, prop } from 'ramda'

type Enumerable = { key: string; __typename: string }

const itemsOfType = (type: string, items: Enumerable[]) =>
  items.filter(propEq('__typename', type))
const toEnumKeyVal = (val: string) => {
  const key = val
    .split('')
    .map((c, i) => (i === 0 ? c.toUpperCase() : c))
    .join('')
  return `${key} = '${val}'`
}

export const toEnum = (type: string, items: Enumerable[]): string => {
  const keys = itemsOfType(type, items)
  return `export enum ${type} {
  ${keys
    .map(prop('key'))
    .map(toEnumKeyVal)
    .join(',\n  ')},
}
`
}
