#!/usr/bin/env node

const { spawnSync } = require('child_process');
const prompts = require('prompts');
const chalk = require('chalk');

(async () => {
  const commitTypes = [
    { title: 'feat: New Feature', value: 'feat' },
    { title: 'fix: Fixing Bugs', value: 'fix' },
    { title: 'chore: Miscellaneous Changes', value: 'chore' },
    { title: 'refactor: Code Refactoring', value: 'refactor' },
    { title: 'docs: Documentation Updates', value: 'docs' },
    { title: 'style: Code Formatting', value: 'style' },
    { title: 'test: Testing Updates', value: 'test' },
    { title: 'perf: Performance Improvements', value: 'perf' },
    { title: 'ci: Continuous Integration', value: 'ci' },
    { title: 'build: Build System Updates', value: 'build' },
    { title: 'revert: Reverting Changes', value: 'revert' },
  ].map(t => {
    const [mainTitle, titleDescription] = t.title.split(':');

    // prettier-ignore
    const formattedTitle = `${chalk.blueBright(mainTitle + ':')}${chalk.yellowBright(titleDescription)}`;

    return {
      ...t,
      title: formattedTitle,
    };
  });

  const response = await prompts([
    {
      type: 'select',
      name: 'commitType',
      choices: commitTypes,
      message: `Select your commit type`,
      optionsPerPage: commitTypes.length,
    },
    {
      type: 'text',
      name: 'commitMessage',
      message: `Enter your commit message`,
    },
  ]);

  const { commitType, commitMessage } = response;

  if (!commitType || !commitMessage) return;

  const cp = spawnSync('git', ['commit', '-m', `${commitType}: ${commitMessage}`], {
    stdio: 'inherit',
    encoding: 'utf-8',
  });

  if (cp.error) {
    console.error(chalk.redBright(`Error: ${cp.error.message}`));
  }
})();
