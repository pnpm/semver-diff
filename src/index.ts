const CHANGE_TYPE = ['breaking', 'feature', 'fix'] as const

export type VERSION_CHANGE = typeof CHANGE_TYPE[number] | 'unknown'

export default function semverDiff (
  version1: string,
  version2: string,
): { change: VERSION_CHANGE | null, diff: [string[], string[]]} {
  if (version1 === version2) {
    return {
      change: null,
      diff: [parseVersion(version1), []]
    }
  }
  const version1Tuples = parseVersion(version1)
  const version2Tuples = parseVersion(version2)
  const same = []
  let change: VERSION_CHANGE = 'unknown'
  const maxTuples = Math.max(version1Tuples.length, version2Tuples.length)
  let unstable = version1Tuples[0] === '0' || version2Tuples[0] === '0' || maxTuples > 3
  for (let i = 0; i < maxTuples; i++) {
    if (version1Tuples[i] === version2Tuples[i]) {
      same.push(version1Tuples[i])
      continue
    }
    if (unstable === false) {
      change = CHANGE_TYPE[i] || 'unknown'
    }
    return {
      change,
      diff: [same, version2Tuples.slice(i)],
    }
  }
  return {
    change,
    diff: [same, []],
  }
}

function parseVersion (version: string) {
  const [normalVersion, prereleaseVersion] = version.split('-')
  return [
    ...normalVersion.split('.'),
    ...(typeof prereleaseVersion !== 'undefined' ? prereleaseVersion.split('.') : [])
  ]
}
