import { Cli } from "./cli.ts";
import { Crawler } from "./crawler.ts";
import { GithubCommit, GithubOrg } from "./models/api.ts";

// Entry point
const cli = new Cli(Deno.args);
console.log(
  `cli.arguments: ${JSON.stringify({ ...cli.getArguments() }, null, 2)}`,
);

const crawler = new Crawler(cli.getEnvFilePath());
console.log(`GitHub User: ${crawler.getGhUser()}`);
console.log(`GitLab User: ${crawler.getGlabUser()}`);
await crawler.execCrawling(
  cli.getSince(),
  cli.getUntil(),
  cli.getNRepos(),
  cli.getNCommits(),
);

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
