import { uniq, prop, map, compose } from 'ramda'
import { writeFileSync } from 'fs'
const copy: Copy = require('./copy')

type KeyValueType<T extends string> = { key: string; value: string; __typename: T }
type Copy = { data: { items: KeyValueType<any>[] } }

const makeTypes = compose(
  uniq,
  map(prop('__typename')),
)
writeFileSync('src/types.generated', makeTypes(copy.data.items), 'utf8')
