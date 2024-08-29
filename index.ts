#!/usr/bin/env node

import prompts, { type PromptObject } from 'prompts';
import { spawnSync } from 'child_process';
import chalk from 'chalk';

// * data
import commitChoices from './data/commitChoices.json';

const commitTypes = commitChoices.map(c => c.value);

const commands: Record<string, string[]> = {
  log: ['log', '--oneline'],
  status: ['status'],
  reset: ['reset', 'HEAD~1'],
  sreset: ['reset', '--soft', 'HEAD~1'],
  hreset: ['reset', '--hard', 'HEAD~1'],
};

// * utils
const gitSpawn = (...args: string[]) => {
  const cp = spawnSync('git', [...args], {
    stdio: 'inherit',
    encoding: 'utf-8',
  });

  if (cp.error) {
    console.error(chalk.redBright(`Error: ${cp.error.message}`));
  }
};

(async () => {
  const args = process.argv.slice(2);
  const _prompts: PromptObject<string>[] = [];
  let commitType, commitMessage;

  if (args.length > 0) {
    const initialArg = args[0];

    if (initialArg in commands) return gitSpawn(...commands[initialArg]);

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

  gitSpawn('commit', '-m', `${commitType}: ${commitMessage}`);
})();
