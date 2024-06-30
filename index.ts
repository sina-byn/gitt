#!/usr/bin/env node

import prompts, { type PromptObject } from 'prompts';
import { spawnSync } from 'child_process';
import chalk from 'chalk';

// * data
import commitChoices from './data/commitChoices.json';

const commitTypes = commitChoices.map(c => c.value);

(async () => {
  const args = process.argv.slice(2);
  const _prompts: PromptObject<string>[] = [];
  let commitType, commitMessage;

  if (args.length > 0) {
    [commitType, commitMessage] = args;

    if (!commitTypes.includes(commitType)) throw new Error('invalid commit type provided');
  }

  const choices = commitChoices.map(t => {
    const [mainTitle, titleDescription] = t.title.split(':');

    // prettier-ignore
    const formattedTitle = `${chalk.blueBright(mainTitle + ':')}${chalk.yellowBright(titleDescription)}`;

    return {
      ...t,
      title: formattedTitle,
    };
  });

  if (!commitType) {
    _prompts.push({
      choices,
      type: 'select',
      name: 'commitType',
      message: `Select your commit type`,
      // @ts-ignore
      optionsPerPage: commitTypes.length,
    });
  }

  if (!commitMessage) {
    _prompts.push({
      type: 'text',
      name: 'commitMessage',
      message: `Enter your commit message`,
    });
  }

  const response = await prompts(_prompts);

  commitType = response.commitType ?? commitType;
  commitMessage = response.commitMessage ?? commitMessage;

  if (!commitType || !commitMessage) throw new Error('invalid arguments provided');

  commitMessage = commitMessage.replace(/\^/g, '');

  const cp = spawnSync('git', ['commit', '-m', `${commitType}: ${commitMessage}`], {
    stdio: 'inherit',
    encoding: 'utf-8',
  });

  if (cp.error) {
    console.error(chalk.redBright(`Error: ${cp.error.message}`));
  }
})();
