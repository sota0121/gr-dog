# Notes

## Resources links

- [Create An Advanced CLI — With TypeScript](https://levelup.gitconnected.com/create-your-own-advanced-cli-with-typescript-5868ae3df397)
  - for directory structure and script structure


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