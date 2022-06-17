# gr-dog

`gr-dog` is Git Repository Collecting Dog.

## Run Test

```bash
# curl on gh
OWNER=sota0121
REPO=lab
curl -H "Authorization: token $(TOKEN)" https://api.github.com/repos/$(OWNER)/$(REPO)/commits

# curl on glab
PROJECT_ID=29596866
curl -H "PRIVATE-TOKEN: $(TOKEN)" "https://gitlab.com/api/v4/projects/$(PROJECT_ID)/repository/commits" | jq .
```

