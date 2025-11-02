import { exec } from 'child_process';
import { promisify } from 'util';
import dayjs, { type Dayjs } from 'dayjs';
import {git, TEST_DIR_PATH} from "./constants.js";

const execPromise = promisify(exec);

export async function createAutoCommit(day: Dayjs = dayjs()) {
    const NEW_AUTHOR_NAME = "Merge Author Name"; // Neuen/Anderen Namen für den Merge
    const NEW_AUTHOR_EMAIL = "merge.author@example.com";

    const env = {
        ...process.env,
        // GIT_COMMITTER_DATE: formattedDate,
        // GIT_AUTHOR_DATE: formattedDate,
        GIT_AUTHOR_NAME: NEW_AUTHOR_NAME,
        GIT_AUTHOR_EMAIL: NEW_AUTHOR_EMAIL,
    };

    await execPromise('git-tools auto-commit', { cwd: TEST_DIR_PATH, env });
    const log = await git.log();
    console.log(`✅ Commit erstellt: ${log.latest?.hash} — ${log.latest?.date}`);
}
