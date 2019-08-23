const semver = require('semver')

const CHANGE_TYPE = ['breaking', 'feature', 'fix']

module.exports = function semverDiff (version1, version2) {
    if (version1 === version2) {
        const parsed = parseVersion(version1)
        return {
            change: null,
            version: {
                samePart: parsed.versionParts,
                diffPart: [],
            },
            prerelease: {
                samePart: parsed.prereleaseParts,
                diffPart: [],
            }
        }
    }
    const parsed1 = parseVersion(version1)
    const parsed2 = parseVersion(version2)
    const result = {
        version: {
            samePart: [],
            diffPart: [],
        },
        prerelease: {
            samePart: [],
            diffPart: [],
        }
    }
    let change = 'unknown'
    let firstNonZero = -1
    for (let i = 0; i < 3; i++) {
        if (firstNonZero === -1 && parsed1.versionParts[i] !== '0' && parsed2.versionParts[i] !== '0') {
            firstNonZero = i
        }
        if (parsed1.versionParts[i] === parsed2.versionParts[i]) {
            result.version.samePart.push(parsed1.versionParts[i])
        } else {
            if (firstNonZero === 0) {
                change = CHANGE_TYPE[i]
            }
            result.version.diffPart = parsed2.versionParts.slice(i)
            break
        }
    }
    for (let i = 0; i < Math.max(parsed1.prereleaseParts.length, parsed2.prereleaseParts.length); i++) {
        if (parsed1.prereleaseParts[i] === parsed2.prereleaseParts[i]) {
            result.prerelease.samePart.push(parsed1.prereleaseParts[i])
        } else {
            result.prerelease.diffPart = parsed2.prereleaseParts.slice(i)
            break
        }
    }
    return {
        ...result,
        change
    }
}

function parseVersion (version) {
    const [normalVersion, prereleaseVersion] = version.split('-')
    // console.log(normalVersion, '-', prereleaseVersion)
    return {
        versionParts: normalVersion.split('.'),
        prereleaseParts: typeof prereleaseVersion !== 'undefined' ? prereleaseVersion.split('.') : []
    }
}

// should return
// diff
// samePart
// differentPart
