import {createHistoricalCommit} from "./utils/create-historical-commit.js";
import {initializeGitRepoWithSkeleton} from "./utils/initialize-git-repo-with-skeleton.js";


await initializeGitRepoWithSkeleton()
await createHistoricalCommit('Test Commit');
await createHistoricalCommit('Second Test Commit');


