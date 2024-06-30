#!/usr/bin/env node

import { spawnSync } from 'child_process';
import prompts from 'prompts';
import chalk from 'chalk';

// * data
import commitChoices from './data/commitChoices.json';

const commitTypes = commitChoices.map(c => c.value);

(async () => {
  const choices = commitChoices.map(t => {
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
      choices,
      type: 'select',
      name: 'commitType',
      message: `Select your commit type`,
      // @ts-ignore
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
