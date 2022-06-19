# Notes

## Resources links

- [Create An Advanced CLI — With TypeScript](https://levelup.gitconnected.com/create-your-own-advanced-cli-with-typescript-5868ae3df397)
  - for directory structure and script structure
- For CLI Arguments parsing
  - [Deno Args | GitHub](https://github.com/KSXGitHub/deno-args)
  - [Deno Args / examples](https://github.com/KSXGitHub/deno-args/tree/master/examples)
  - [Deno Args Examples on Sample App](https://github.com/KSXGitHub/deno_run_tests_on_localhost/blob/0.2.2/cli.ts)


## Memo

以下の方法だと、非同期処理が全プロセス終了後に実行されてしまう。

```typescript
const ids = [1, 2, 3, 4, 5];
let results = [];
ids.forEach(async (id) => {
  const res = await fetch(`https://example.com/${id}`);
  results.push(res);
});
console.log(results.length);
// prints 0
```

for 文を使って回避した。

```typescript
const ids = [1, 2, 3, 4, 5];
let results = [];
for (const id of ids) {
  const res = await fetch(`https://example.com/${id}`);
  results.push(res);
}
console.log(results.length);
// prints 5
```