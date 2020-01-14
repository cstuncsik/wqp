import crypto from 'crypto'

Object.defineProperty(window, 'crypto', {
  writable: true,
  value: {
    getRandomValues: (arr: Uint8Array) => crypto.randomBytes(arr.length)
  }
})