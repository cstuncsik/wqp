import { pick } from 'helpers/object'

interface SimpleObject {
  a: number
  b: number
  c: number
}

describe('object helper', () => {
  it('pick can make a new object from the passed properties', () => {
    const original: SimpleObject = { a: 1, b: 2, c: 3 }
    const value: Partial<SimpleObject> = pick<SimpleObject, keyof SimpleObject>(['a', 'b'])(original)
    const expected: Partial<SimpleObject> = { a: 1, b: 2 }
    expect(value).toEqual(expected)
    expect(Object.is(original, value)).toBe(false)
  })
})
