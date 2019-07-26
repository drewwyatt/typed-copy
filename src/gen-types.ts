import { uniq, prop, map, compose, propEq } from 'ramda'
import { writeFileSync } from 'fs'
const copy: Copy = require('./copy')

type KeyValueType<T extends string> = { key: string; value: string; __typename: T }
type Copy = { data: { items: KeyValueType<any>[] } }

const makeTypes = compose(
  uniq,
  map(prop('__typename')),
)

const itemsOfType = (type: any) => copy.data.items.filter(propEq('__typename', type))

const toEnum = (type: any): string => {
  const keys = itemsOfType(type)
  return `export enum ${type as string} {
  ${keys.map(prop('key')).join(',\n  ')},
}
`
}

const types = makeTypes(copy.data.items)
const things = types.map(toEnum)
writeFileSync('src/types.generated.ts', things.join('\n'), 'utf8')
