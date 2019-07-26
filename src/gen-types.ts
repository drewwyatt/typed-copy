import { uniq, prop, map, compose } from 'ramda'
import { writeFileSync } from 'fs'
import { parse } from 'messageformat-parser'
import { toEnum, toProps } from './generators'

const {
  data: { items },
}: Copy = require('./copy')

type KeyValueType<T extends string> = { key: string; value: string; __typename: T }
type Copy = { data: { items: KeyValueType<any>[] } }

const makeTypes = compose<KeyValueType<string>[], string[], string[]>(
  uniq,
  map(prop('__typename')),
)

const foo = items.map(i => parse(i.value)) //parse(items.map(prop('value'))[4])[0]

const types = makeTypes(items)
const things = types.map(t => toEnum(t, items))
writeFileSync('src/types.generated.ts', things.join('\n'), 'utf8')
writeFileSync('src/foo.generated.json', JSON.stringify(foo, null, 2), 'utf8')
writeFileSync('src/bar.generated.ts', toProps(items).join('\n') + '\n', 'utf8')
