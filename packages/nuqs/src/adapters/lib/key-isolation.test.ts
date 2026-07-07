import { describe, expect, it } from 'vitest'
import { filterSearchParams } from './key-isolation'

describe('key-isolation: filterSearchParams (copy: true)', () => {
  it('keeps only the watched keys', () => {
    const source = new URLSearchParams('?a=1&b=2&c=3')
    const filtered = filterSearchParams(source, ['c'], true)
    expect(filtered.toString()).toBe('c=3')
  })
  it('does not mutate the source', () => {
    const source = new URLSearchParams('?a=1&b=2&c=3')
    filterSearchParams(source, ['b'], true)
    expect(source.toString()).toBe('a=1&b=2&c=3')
  })
  it('keeps repeated values of watched keys', () => {
    const source = new URLSearchParams('?a=1&a=2&b=3')
    const filtered = filterSearchParams(source, ['a'], true)
    expect(filtered.getAll('a')).toEqual(['1', '2'])
  })
  it('returns the source as-is when there are no watched keys', () => {
    const source = new URLSearchParams('?a=1')
    expect(filterSearchParams(source, [], true)).toBe(source)
  })
})
