import { parse } from 'messageformat-parser'
import { anyPass, propEq } from 'ramda'

type Token = string | Argument | Plural | Select | Function

type Argument = {
  type: 'argument'
  arg: Identifier
}

type Plural = {
  type: 'plural'
  arg: Identifier
  offset: number
  cases: PluralCase[]
}

type Select = {
  type: 'select'
  arg: Identifier
  cases: SelectCase[]
}

type PluralCase = {
  key: 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | '=0' | '=1' | '=2'
  tokens: Token[]
}

type SelectCase = {
  key: Identifier
  tokens: Token[]
}

type Identifier = string // not containing whitespace or control characters
type Parsable = Argument | Plural | Select

const isArgument = propEq('type', 'argument') as (i: unknown) => i is Argument
// const isPlural = propEq('type', 'plural') as (i: unknown) => i is Plural
const isSelect = propEq('type', 'select') as (i: unknown) => i is Select
const isParsable = anyPass([isArgument, isSelect]) as (i: unknown) => i is Parsable

const ALMOST_ANY_TYPE = 'string | number | Date | JSX.Element'
const toArg = (item: Argument) => `${item.arg}: ${ALMOST_ANY_TYPE}`
const toSelect = (item: Select) => {
  const args: string[] = [item.arg]
  item.cases
}

const isOther = (str: string) => str === 'other'

type Input = { key: string; value: string; __typename: string }

const toTypeName = (i: Input) => [i.__typename, i.key].join('_') // temp
export const toProps = (input: Input[]): string[] =>
  input.map(item => {
    const props = parse(item.value)
      .filter(isArgument)
      .map(toArg)

    return props.length
      ? `type ${toTypeName(item)} = {
  ${props.join('\n  ')}
}`
      : `type ${toTypeName(item)} = {}`
  })
