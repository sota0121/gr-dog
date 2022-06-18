import * as dotenv from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

import { GithubCommit, GithubOrg, GithubRepo } from "./models/api.ts";

export class Crawler {
  private ghToken: string = "";
  private ghUser: string = "github-user";
  private ghOrgsForUser: GithubOrg[] = [];
  private ghReposForUser: GithubRepo[] = [];
  private ghCommits: GithubCommit[] = [];
  private glabToken: string = "";
  private glabUser: string = "gitlab-user";
  private glabReposForUser: string[] = [];

  constructor(envFilePath: string) {
    console.log(`envFilePath: ${envFilePath}`);
    // Load env file
    const envObj = dotenv.config({ path: envFilePath });
    // Set env vars
    this.ghUser = envObj.GITHUB_USER;
    this.ghToken = envObj.GITHUB_PRIVATE_TOKEN;
    this.glabUser = envObj.GITLAB_USER;
    this.glabToken = envObj.GITLAB_PRIVATE_TOKEN;
  }

  public getGhUser(): string {
    return this.ghUser;
  }

  public getGlabUser(): string {
    return this.glabUser;
  }

  public async execCrawling(since: string, until: string): Promise<void> {
    console.log(`since: ${since}`);
    console.log(`until: ${until}`);
    console.log("future these are parsed as dates");
    // ==============================================
    // Get github test
    // ==============================================
    await this.retrieveGithubOrgsForUser(this.ghUser);
    await this.retrieveGithubReposForUser(this.ghUser);
    this.ghOrgsForUser.forEach(async (org) => {
      await this.retrieveGithubReposForOrg(org.login);
    });
    this.ghReposForUser.forEach(async (repo) => {
      console.log(`repo: ${repo.owner.login} / ${repo.name}`);
      await this.retrieveGithubCommitsForRepo(repo);
    });

    // ---
    // check results
    this.ghOrgsForUser.forEach((org) => {
      console.log(`org: ${org.login}`);
    });
    this.ghReposForUser.forEach((repo) => {
      console.log(`repo: ${repo.name} / owner: ${repo.owner.login}`);
    });
    this.ghCommits.forEach((commit) => {
      console.log(
        `commit-author: ${commit.ctx.author} / commit-message: ${commit.ctx.message}`,
      );
    });
  }

  private async retrieveGithubReposForOrg(org: string): Promise<void> {
    const url = `https://api.github.com/orgs/${org}/repos`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (json?.message != "") {
      console.log(`${json.message}`);
      return;
    }

    json.forEach((element) => {
      const repo: GithubRepo = {
        ...element,
      };
      this.ghReposForUser.push({ ...repo });
    });
  }

  private async retrieveGithubOrgsForUser(user: string): Promise<void> {
    const url = `https://api.github.com/users/${user}/orgs`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (json?.message != "") {
      console.log(`${json.message}`);
      return;
    }

    json.forEach((element) => {
      const org: GithubOrg = {
        ...element,
      };
      this.ghOrgsForUser.push({ ...org });
    });
  }

  private async retrieveGithubReposForUser(
    user: string,
  ): Promise<void> {
    const url = `https://api.github.com/users/${user}/repos`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (json?.message != "") {
      console.log(`${json.message}`);
      return;
    }

    json.forEach((element) => {
      const repo: GithubRepo = {
        ...element,
      };
      this.ghReposForUser.push({ ...repo });
    });
  }

  private async retrieveGithubCommitsForRepo(repo: GithubRepo): Promise<void> {
    const url =
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (json?.message != "") {
      console.log(`${json.message}`);
      return;
    }

    json.forEach((element) => {
      const commit: GithubCommit = {
        ...element,
      };
      this.ghCommits.push(commit);
    });
  }
}

const crawler = new Crawler("./.env");
console.log(crawler.getGhUser());
console.log(crawler.getGlabUser());
crawler.execCrawling("2020-01-01", "2020-01-02");
