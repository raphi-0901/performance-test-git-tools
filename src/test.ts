import {createHistoricalCommit} from "./utils/create-historical-commit.js";
import {initializeGitRepoWithSkeleton} from "./utils/initialize-git-repo-with-skeleton.js";
import {createAutoCommitUsingPatch} from "./utils/create-auto-commit-using-patch.js";

const args = process.argv.slice(2);
const hasFlag = (flagName: string) => args.includes(`--${flagName}`);
const dryRun = hasFlag('dry-run');

await initializeGitRepoWithSkeleton()
await createHistoricalCommit('Test Commit');
await createHistoricalCommit('Second Test Commit');

await createAutoCommitUsingPatch('1-install-tailwind', dryRun)
await createAutoCommitUsingPatch('2-install-color-mode', dryRun)
await createAutoCommitUsingPatch('3-create-menu-component', dryRun)
await createAutoCommitUsingPatch('4-feature-menu-component', dryRun)
await createAutoCommitUsingPatch('5-refactor-menu-component', dryRun)


