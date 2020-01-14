import '../../test/mocks/crypto'
import { uuidv4 } from 'helpers/string'

describe('string helper', () => {
  const regExp = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i

  test.each([...Array(100)].map(() => [uuidv4()]))('uuidv4 %s is RFC-compliant Universally Unique IDentifier', id => {
    expect(regExp.test(id)).toBe(true)
  })
})
