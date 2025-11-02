import {createHistoricalCommit} from "./utils/create-historical-commit.js";
import {initializeGitRepoWithSkeleton} from "./utils/initialize-git-repo-with-skeleton.js";
import {createAutoCommitUsingPatch} from "./utils/create-auto-commit-using-patch.js";

await initializeGitRepoWithSkeleton()
await createHistoricalCommit('Test Commit');
await createHistoricalCommit('Second Test Commit');

await createAutoCommitUsingPatch('1-install-tailwind')
await createAutoCommitUsingPatch('2-install-color-mode')
await createAutoCommitUsingPatch('3-create-menu-component')


