import { Crawler } from "./crawler.ts";
import { GithubCommit, GithubOrg } from "./models/api.ts";

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
// main();

const crawler = new Crawler("./.env");
console.log(crawler.getGhUser());
console.log(crawler.getGlabUser());
await crawler.execCrawling("2020-01-01", "2020-01-02");

// ---
// check results
const ghOrgsForUser: GithubOrg[] = crawler.getOrgs();
ghOrgsForUser.forEach((org) => {
  console.log(`org: ${org.login}`);
});

const ghCommits: GithubCommit[] = crawler.getCommits();
console.log(`commits: ${ghCommits.length}`);
ghCommits.forEach((commit) => {
  console.log(
    `commit-author-name: ${commit.commit.author.name} / commit-message: ${commit.commit.message}`,
  );
});
