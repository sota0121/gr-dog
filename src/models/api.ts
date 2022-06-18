export type ErrResponseGh = {
  message: string;
  documentation_url: string;
};

export const isErrGhResponse = (arg: unknown): arg is ErrResponseGh => {
  if (arg && typeof arg === "object") {
    return typeof (arg as ErrResponseGh).message === "string" &&
      typeof (arg as ErrResponseGh).documentation_url === "string";
  }
  return false;
};

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
  commit: GithubCommitCtx;
}
