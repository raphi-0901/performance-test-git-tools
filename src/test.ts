import {createHistoricalCommit} from "./utils/create-historical-commit.js";
import {initializeGitRepoWithSkeleton} from "./utils/initialize-git-repo-with-skeleton.js";
import {applyPatch} from "./utils/apply-patch.js";
import {createAutoCommit} from "./utils/create-auto-commit.js";
import {git} from "./utils/constants.js";


await initializeGitRepoWithSkeleton()
await createHistoricalCommit('Test Commit');
await createHistoricalCommit('Second Test Commit');
await applyPatch('install-tailwind')
await git.add('.')
await createAutoCommit()


