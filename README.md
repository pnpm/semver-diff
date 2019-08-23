# @pnpm/semver-diff

> Gets the difference between two semver versions

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/@pnpm/semver-diff.svg)](https://www.npmjs.com/package/@pnpm/semver-diff) [![Build Status](https://img.shields.io/travis/pnpm/semver-diff/master.svg)](https://travis-ci.org/pnpm/semver-diff)
<!--/@-->

## Installation

```sh
<pnpm|yarn|npm> add @pnpm/semver-diff
```

## Usage

```ts
import semverDiff from '@pnpm/semver-diff'

semverDiff('2.0.0', '2.1.0')
//> { change: 'feature', diff: [['2'], ['1', '0']] }
```

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
