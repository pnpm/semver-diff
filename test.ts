import test = require('tape')
import semverDiff, { SEMVER_CHANGE } from './src'

const fixtures: Array<[[string, string], { change: SEMVER_CHANGE | null, diff: [string[], string[]]}]> = [
  [
    ['1.0.0', '2.0.0'],
    { change: 'breaking', diff: [[], ['2', '0', '0']] },
  ],
  [
    ['1.1.0', '1.2.0'],
    { change: 'feature', diff: [['1'], ['2', '0']] },
  ],
  [
    ['1.0.0', '1.0.1'],
    { change: 'fix', diff: [['1', '0'], ['1']] },
  ],
  [
    ['1.0.0', '1.0.0'],
    { change: null, diff: [['1', '0', '0'], []] },
  ],
  [
    ['0.0.1', '0.0.2'],
    { change: 'unknown', diff: [['0', '0'], ['2']] },
  ],
  [
    ['0.1.0', '0.0.1'],
    { change: 'unknown', diff: [['0'], ['0', '1']] },
  ],
  [
    ['0.1.0', '0.2.0'],
    { change: 'unknown', diff: [['0'], ['2', '0']] },
  ],
  [
    ['0.1.0', '0.1.2'],
    { change: 'unknown', diff: [['0', '1'], ['2']] },
  ],
  [
    ['0.1.0', '1.0.0'],
    { change: 'unknown', diff: [[], ['1', '0', '0']] },
  ],
  [
    ['1.0.0', '1.0.0-0'],
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['0']]
    },
  ],
  [
    ['1.0.0', '1.0.0-rc.1'],
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['rc', '1']]
    },
  ],
  [
    ['1.0.0-rc.0', '1.0.0-rc.1'],
    {
      change: 'unknown',
      diff: [['1', '0', '0', 'rc'], ['1']]
    },
  ],
  [
    ['1.0.0-0', '1.0.0-rc.1'],
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['rc', '1']]
    },
  ],
  [
    ['1.0.0-rc.1', '1.0.0-0'],
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['0']]
    },
  ],
  [
    ['1.0.0-beta.0', '1.0.0-rc.1'],
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['rc', '1']]
    },
  ],
  [
    ['1.0.0-beta.0', '1.0.1-beta.1'],
    {
      change: 'unknown',
      diff: [['1', '0'], ['1', 'beta', '1']]
    },
  ],
  [
    ['1.0.0-a-b.0', '1.0.0-a-c.0'],
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['a-c', '0']]
    },
  ],
]

test('semverDiff', t => {
  for (const [args, expecedResult] of fixtures) {
    t.deepEqual(semverDiff(...args), expecedResult, `diffing ${JSON.stringify(args)} returns ${JSON.stringify(expecedResult)}`)
  }
  t.end()
})
