import { App, Octokit } from "https://cdn.skypack.dev/octokit?dts";

const octokit: Octokit = new Octokit({
  auth: "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",
});
const { data: { login } } = await octokit.rest.users.getAuthenticated();
console.log(`Hello ${login}`);

function main(): void {
  console.log("=== start gr-dog ===\n");
  const args = Deno.args;
  const ret = parseArgs(args);
  console.log(`parseArgs returned: ${ret}`);
  const jsonPromise = fetch("https://api.github.com/users/denoland");
  jsonPromise.then((response) => {
    return response.json();
  }).then((jsonData) => {
    console.log(jsonData);
  }).catch((error) => {
    console.log(error);
  });
}

function parseArgs(args: string[]): number {
  if (args.length === 0) {
    console.log("no args");
    return 1;
  } else {
    args.map((arg: string): void => console.log(arg));
    return 0;
  }
}

async function fetchGitHubReposForUser(user: string): Promise<void> {
  const url = `https://api.github.com/users/${user}/repos`;
  const response = await fetch(url);
  const json = response.json();
}

// Entry point
main();
