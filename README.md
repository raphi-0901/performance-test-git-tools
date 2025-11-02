# Run test.ts
```bash
npx tsc src/test.ts
```


Make changes in test-git-tools folder and create a patch file.
# Create patch file

```bash
# in skeleton folder
git diff -- test-git-tools > diff.patch
```

# Apply patch file
```bash
git apply --directory=test-git-tools/ diff.path
```

# When creating new files
```bash
 git diff --cached
 ```
