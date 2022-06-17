# gr-dog

`gr-dog` is Git Repository Collecting Dog.

## Development

### Run script

```bash
deno run --allow-read --allow-net ./src/main.ts ${args}
```

### Compile executable

Usualy, you can use script for compilation.

```bash
# Compile
./compile-bin.sh

# Run
./bin/gr-dog
```

Command is below.

```bash
deno compile --allow-read --allow-net --unstable -o ./bin/gr-dog ./src/main.ts
```

## Run Test

```bash
# ----------------------------------------------------
# retrieve all repositories that a user is a member of
# ----------------------------------------------------
# curl on gh (with user name)
USER=$user_name # your user name.
curl -H "Authorization: token ${TOKEN}" https://api.github.com/users/${USER}/repos

# [optional] curl on gh (with org name)
ORG=$org_name # your organization name. not your user name.
curl -H "Authorization: token ${TOKEN}" https://api.github.com/orgs/${ORG}/repos

# curl on glab
curl -H "PRIVATE-TOKEN: $(TOKEN)" "https://gitlab.com/api/v4/projects/?membership=True" | jq .

# ----------------------------------------------------
# retrieve some commits from a specific repository
# ----------------------------------------------------
# curl on gh
OWNER=sota0121
REPO=lab
curl -H "Authorization: token $(TOKEN)" https://api.github.com/repos/$(OWNER)/$(REPO)/commits

# curl on glab
PROJECT_ID=29596866
curl -H "PRIVATE-TOKEN: $(TOKEN)" "https://gitlab.com/api/v4/projects/$(PROJECT_ID)/repository/commits" | jq .
```

## How to use API

- About GitHub: [GitHub API Docs](https://docs.github.com/en/rest)
- About GitLab:
  [GitLab API Docs](https://docs.gitlab.com/ee/api/api_resources.html)
