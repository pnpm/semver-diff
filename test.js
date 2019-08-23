const test = require('tape')
const semverDiff = require('.')

test('semverDiff', t => {
    t.deepEqual(semverDiff('1.0.0', '2.0.0'), { change: 'breaking', diff: [[], ['2', '0', '0']] })
    t.deepEqual(semverDiff('1.1.0', '1.2.0'), { change: 'feature', diff: [['1'], ['2', '0']]})
    t.deepEqual(semverDiff('1.0.0', '1.0.1'), { change: 'fix', diff: [['1', '0'], ['1']]})
    t.deepEqual(semverDiff('1.0.0', '1.0.0'), { change: null, diff: [['1', '0', '0'], []]})
    t.deepEqual(semverDiff('0.0.1', '0.0.2'), { change: 'unknown', diff: [['0', '0'], ['2']]})
    t.deepEqual(semverDiff('0.1.0', '0.0.1'), { change: 'unknown', diff: [['0'], ['0', '1']]})
    t.deepEqual(semverDiff('0.1.0', '0.2.0'), { change: 'unknown', diff: [['0'], ['2', '0']]})
    t.deepEqual(semverDiff('0.1.0', '0.1.2'), { change: 'unknown', diff: [['0', '1'], ['2']]})
    t.deepEqual(semverDiff('0.1.0', '1.0.0'), { change: 'unknown', diff: [[], ['1', '0', '0']]})
    t.deepEqual(semverDiff('1.0.0', '1.0.0-0'), {
        change: 'unknown',
        diff: [['1', '0', '0'], ['0']]
    })
    t.deepEqual(semverDiff('1.0.0', '1.0.0-rc.1'), {
        change: 'unknown',
        diff: [['1', '0', '0'], ['rc', '1']]
    })
    t.deepEqual(semverDiff('1.0.0-rc.0', '1.0.0-rc.1'), {
        change: 'unknown',
        diff: [['1', '0', '0', 'rc'], ['1']]
    })
    t.deepEqual(semverDiff('1.0.0-0', '1.0.0-rc.1'), {
        change: 'unknown',
        diff: [['1', '0', '0'], ['rc', '1']]
    })
    t.deepEqual(semverDiff('1.0.0-rc.1', '1.0.0-0'), {
        change: 'unknown',
        diff: [['1', '0', '0'], ['0']]
    })
    t.deepEqual(semverDiff('1.0.0-beta.0', '1.0.0-rc.1'), {
        change: 'unknown',
        diff: [['1', '0', '0'], ['rc', '1']]
    })
    t.deepEqual(semverDiff('1.0.0-beta.0', '1.0.1-beta.1'), {
        change: 'unknown',
        diff: [['1', '0'], ['1', 'beta', '1']]
    })
    t.end()
})
