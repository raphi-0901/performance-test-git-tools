# Run test.ts
```bash
npx tsc src/test.ts
```


Make changes in skeleton folder and create a patch file.

# Create patch file

```bash
# in skeleton folder
git diff -- . > diff.patch
```

# Apply patch file
```bash
 git apply --directory=test-git-tools/ diff.patch
```
