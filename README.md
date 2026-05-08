# @pnpm/semver-diff

> Gets the difference between two semver versions

[![npm version](https://img.shields.io/npm/v/@pnpm/semver-diff.svg)](https://www.npmjs.com/package/@pnpm/semver-diff)

## Installation

```sh
pnpm add @pnpm/semver-diff
```

## Usage

```ts
import semverDiff from '@pnpm/semver-diff'

semverDiff('2.0.0', '2.1.0')
//> { change: 'feature', diff: [['2'], ['1', '0']] }
```

## License

[MIT](./LICENSE)

Copyright (c) 2019-2026 Zoltan Kochan
