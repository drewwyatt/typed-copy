import { uniq, prop, map, compose, propEq } from 'ramda'
import { writeFileSync } from 'fs'
import { parse } from 'messageformat-parser'
const {
  data: { items },
}: Copy = require('./copy')

type KeyValueType<T extends string> = { key: string; value: string; __typename: T }
type Copy = { data: { items: KeyValueType<any>[] } }

const makeTypes = compose(
  uniq,
  map(prop('__typename')),
)

const itemsOfType = (type: any) => items.filter(propEq('__typename', type))
const toEnumKeyVal = (val: string) => {
  const key = val
    .split('')
    .map((c, i) => (i === 0 ? c.toUpperCase() : c))
    .join('')
  return `${key} = '${val}'`
}

const toEnum = (type: any): string => {
  const keys = itemsOfType(type)
  return `export enum ${type} {
  ${keys
    .map(prop('key'))
    .map(toEnumKeyVal)
    .join(',\n  ')},
}
`
}

const foo = parse(items.map(prop('value'))[4])[0]

const types = makeTypes(items)
const things = types.map(toEnum)
writeFileSync('src/types.generated.ts', things.join('\n'), 'utf8')
writeFileSync('src/foo.generated.json', JSON.stringify(foo, null, 2), 'utf8')
