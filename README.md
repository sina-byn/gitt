# gitt 

a CLI that helps you write better commit messages

Please consider following this project's author, [Sina Bayandorian](https://github.com/sina-byn), and consider starring the project to show your :heart: and support.

## Table of Contents

- [Usage](#usage)
- [Commit Types](#commit-types)
- [Examples](#examples)

## Usage

Clone the repository :
```sh
git clone https://github.com/sina-byn/gitt.git
```

Install dependencies :

```sh
cd gitt && npm i
```

Build :

```sh
npm run build
```

Initialize :
```sh
npx gitt
```

To use globally :

```sh
npm i -g .
```

Then use wherever you want :

```sh
gitt <?commit_type> <?commit_message>
```
`?` : optional argument

## Commit Types

| Commit Type |  |
|---|---|
| feat | New Feature |
| fix | Fixing Bugs |
| chore | Miscellaneous Changes |
| refactor | Code Refactoring |
| docs | Documentation Updates |
| style | Code Formatting |
| test | Testing Updates |
| perf | Performance Improvements |
| ci | Continuous Integration |
| build | Build System Updates |
| revert | Reverting Chanegs |

## Examples
 
```sh
gitt
```

```sh
gitt feat
```

```sh
gitt fix "bug fixed"
```