const test = require('tape')
const semverDiff = require('.')

test('semverDiff', t => {
    t.deepEqual(semverDiff('1.0.0', '2.0.0'), { change: 'breaking', version: {samePart: [], diffPart: ['2', '0', '0'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('1.1.0', '1.2.0'), { change: 'feature', version: {samePart: ['1'], diffPart: ['2', '0'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('1.0.0', '1.0.1'), { change: 'fix', version: {samePart: ['1', '0'], diffPart: ['1'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('1.0.0', '1.0.0'), { change: null, version: {samePart: ['1', '0', '0'], diffPart: [] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('0.0.1', '0.0.2'), { change: 'unknown', version: {samePart: ['0', '0'], diffPart: ['2'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('0.1.0', '0.0.1'), { change: 'unknown', version: {samePart: ['0'], diffPart: ['0', '1'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('0.1.0', '0.2.0'), { change: 'unknown', version: {samePart: ['0'], diffPart: ['2', '0'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('0.1.0', '0.1.2'), { change: 'unknown', version: {samePart: ['0', '1'], diffPart: ['2'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('0.1.0', '1.0.0'), { change: 'unknown', version: {samePart: [], diffPart: ['1', '0', '0'] }, prerelease: {samePart: [], diffPart: []}})
    t.deepEqual(semverDiff('1.0.0', '1.0.0-0'), {
        change: 'unknown',
        version: {samePart: ['1', '0', '0'], diffPart: [] },
        prerelease: {samePart: [], diffPart: ['0']}
    })
    t.deepEqual(semverDiff('1.0.0', '1.0.0-rc.1'), {
        change: 'unknown',
        version: { samePart: ['1', '0', '0'], diffPart: [] },
        prerelease: {samePart: [], diffPart: ['rc', '1']}
    })
    t.deepEqual(semverDiff('1.0.0-rc.0', '1.0.0-rc.1'), {
        change: 'unknown',
        version: { samePart: ['1', '0', '0'], diffPart: [] },
        prerelease: {samePart: ['rc'], diffPart: ['1']}
    })
    t.deepEqual(semverDiff('1.0.0-0', '1.0.0-rc.1'), {
        change: 'unknown',
        version: { samePart: ['1', '0', '0'], diffPart: [] },
        prerelease: {samePart: [], diffPart: ['rc', '1']}
    })
    t.deepEqual(semverDiff('1.0.0-rc.1', '1.0.0-0'), {
        change: 'unknown',
        version: { samePart: ['1', '0', '0'], diffPart: [] },
        prerelease: {samePart: [], diffPart: ['0']}
    })
    t.deepEqual(semverDiff('1.0.0-beta.0', '1.0.0-rc.1'), {
        change: 'unknown',
        version: { samePart: ['1', '0', '0'], diffPart: [] },
        prerelease: {samePart: [], diffPart: ['rc', '1']}
    })
    t.end()
})
