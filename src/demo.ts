import { Foo } from './types.generated'

type Test<T extends string, U extends {} | undefined> = {
  key: T
  values: U
}

type HWorld = Test<Foo.HelloWorld, undefined>
type Temp = Test<Foo.CurrentTemperature, { temp: number }>
type DOB = Test<Foo.DateOfBirth, { dob: string }>
type Union = HWorld | Temp | DOB
const hey: Union = { key: Foo.HelloWorld, values: undefined }

console.log(hey)
