import * as dotenv from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

import {
  GithubCommit,
  GithubOrg,
  GithubRepo,
  isErrGhResponse,
} from "./models/api.ts";

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

  // ==============================================
  // Public methods
  // ==============================================
  public getGhUser(): string {
    return this.ghUser;
  }

  public getGlabUser(): string {
    return this.glabUser;
  }

  public getOrgs(): GithubOrg[] {
    return this.ghOrgsForUser;
  }

  public getCommits(): GithubCommit[] {
    return this.ghCommits;
  }

  /**
   * @param since string - date string (YYYY-MM-DD)
   * @param until string - date string (YYYY-MM-DD)
   * @returns Promise<void>
   * @description Crawling main function
   */
  public async execCrawling(since: string, until: string): Promise<void> {
    console.log(`since: ${since}`);
    console.log(`until: ${until}`);
    console.log("future these are parsed as dates");
    console.log("===================================");
    // ==============================================
    // Get github test
    // ==============================================
    // await this.retrieveGithubOrgsForUser(this.ghUser);
    await this.retrieveGithubReposForUser(this.ghUser);
    // this.ghOrgsForUser.forEach(async (org) => {
    //   await this.retrieveGithubReposForOrg(org.login);
    // });
    for (const [index, repo] of this.ghReposForUser.entries()) {
      // minimal test because of rate limit
      if (index > 0) {
        console.log(`skip repo: ${repo.owner.login} / ${repo.name}`);
      } else {
        console.log(`retrieved repo: ${repo.owner.login} / ${repo.name}`);
        await this.retrieveGithubCommitsForRepo(repo);
      }
    }
    // this.ghReposForUser.forEach(async (repo, index) => {
    //   // execute only one repo because of rate limit
    //   if (index == 0) {
    //     console.log(`retrieved repo: ${repo.owner.login} / ${repo.name}`);
    //     await this.retrieveGithubCommitsForRepo(repo);
    //   } else {
    //     console.log(`skip repo: ${repo.owner.login} / ${repo.name}`);
    //   }
    // });
    // ==============================================
    // Get gitlab test
    console.log("GitLab test (TBD)");
    // ==============================================
  }

  // ==============================================
  // Private methods
  // ==============================================
  /**
   * @param org GithubOrg
   * @returns Promise<void>
   * @description Retrieve github repos for a org
   */
  private async retrieveGithubReposForOrg(org: string): Promise<void> {
    const url = `https://api.github.com/orgs/${org}/repos`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (isErrGhResponse(json)) {
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

  /**
   * @param user string
   * @returns Promise<void>
   * @description Retrieve github orgs for a user
   */
  private async retrieveGithubOrgsForUser(user: string): Promise<void> {
    const url = `https://api.github.com/users/${user}/orgs`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (isErrGhResponse(json)) {
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

  /**
   * @param user string
   * @returns Promise<void>
   * @description Retrieve gitlab repos for a user
   */
  private async retrieveGithubReposForUser(
    user: string,
  ): Promise<void> {
    const url = `https://api.github.com/users/${user}/repos`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (isErrGhResponse(json)) {
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

  /**
   * @param repo GithubRepo
   * @returns Promise<void>
   * @description Retrieve github commits for a repo
   */
  private async retrieveGithubCommitsForRepo(repo: GithubRepo): Promise<void> {
    const url =
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`;
    const response = await fetch(url);
    const json = await response.json();

    // maybe rate limit?
    if (isErrGhResponse(json)) {
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
