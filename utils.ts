import chalk from 'chalk';

// * constants
const MODEL = '@cf/meta/llama-3-8b-instruct';
const API_KEY = process.env.CF_API_KEY;
const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const HAS_CREDENTIALS = !!API_KEY && !!ACCOUNT_ID;

// * types
type AIResponse = { success: boolean; result: { response: string } };

type TypoCheckResult = {
  ok: 'skip' | boolean;
  hasTypo: boolean;
  typos: string[];
  suggestion: string;
};

export const createCommitCompletions = async (commitMessage: string): Promise<TypoCheckResult> => {
  if (!HAS_CREDENTIALS) {
    console.warn(chalk.yellowBright('Provide Cloudflare AI credentials'));
    return { ok: 'skip' } as TypoCheckResult;
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      method: 'POST',
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: `You are an AI that strictly checks commit messages for typos. 
                      Respond in this exact JSON format:
                      {
                        "hasTypo": boolean, 
                        "typos": ["string"], 
                        "suggestion": "string"
                      }.
                      "typos" should be an array of detected misspelled words.
                      "suggestion" should be the entire corrected commit message.
                      
                      IMPORTANT: 
                      - Do NOT change the case of words unless they are proper nouns (e.g., "JavaScript", "GitHub").
                      - Preserve lowercase and uppercase letters as they appear in the original text.
                      - If there are no typos, return {"hasTypo": false}.`,
          },
          {
            role: 'user',
            content: `Check this commit message for typos while keeping the letter cases as they are: "${commitMessage}".`,
          },
        ],
      }),
    }
  );

  const { success, result } = (await response.json()) as AIResponse;
  return { ok: success, ...JSON.parse(result.response) } as TypoCheckResult;
};
