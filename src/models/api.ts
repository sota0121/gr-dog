export interface GithubOrg {
  login: string;
  id: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
  };
}

export interface GithubCommitCtx {
  url: string;
  author: {
    name: string;
  };
  committer: {
    name: string;
  };
  message: string;
}

export interface GithubCommit {
  sha: string;
  url: string;
  html_url: string;
  ctx: GithubCommitCtx;
}
