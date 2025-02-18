# gitt 

a CLI that helps you write better commit messages

Please consider following this project's author, [Sina Bayandorian](https://github.com/sina-byn), and consider starring the project to show your :heart: and support.

## Table of Contents

- [Usage](#usage)
- [Commit Types](#commit-types)
- [AI-Powered Commit Message Checking](#ai-powered-commit-message-checking)
- [Examples](#examples)

## Usage

Clone the repository:
```sh
git clone https://github.com/sina-byn/gitt.git
```

Install dependencies:
```sh
cd gitt && npm i
```

Build:
```sh
npm run build
```

Initialize:
```sh
npx gitt
```

To use globally:
```sh
npm i -g .
```

Then use wherever you want:
```sh
gitt <?commit_type> <?commit_message>
```
`?` : optional argument

## Commit Types

| Commit Type | Description |
|------------|-------------|
| feat       | New Feature |
| fix        | Fixing Bugs |
| chore      | Miscellaneous Changes |
| refactor   | Code Refactoring |
| docs       | Documentation Updates |
| style      | Code Formatting |
| test       | Testing Updates |
| perf       | Performance Improvements |
| ci         | Continuous Integration |
| build      | Build System Updates |
| revert     | Reverting Changes |

## AI-Powered Commit Message Checking

To enable AI-powered commit message typo detection and correction, you need to create a `.env` file at the root of the repository. This file should contain the following environment variables, based on the `.env.example` file:

```ini
CF_API_KEY=your_cloudflare_ai_worker_api_key
CF_ACCOUNT_ID=your_cloudflare_account_id
```

When these environment variables are provided, the AI will automatically check your commit messages for typos and suggest corrections. If you wish to skip this step, use the `--no-check` flag:

```sh
gitt --no-check
```

If the environment variables are not provided, the AI-powered check will be skipped by default.

## Examples

```sh
gitt
```

```sh
gitt feat
```

```sh
gitt fix "bug fixed"
