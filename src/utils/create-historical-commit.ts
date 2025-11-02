import { exec } from 'child_process';
import { promisify } from 'util';
import dayjs, { type Dayjs } from 'dayjs';
import {git, TEST_DIR_PATH} from "./constants.js";

const execPromise = promisify(exec);


export async function createHistoricalCommit(
    message: string,
    day: Dayjs = dayjs()
) {
    const formattedDate = day.format('YYYY-MM-DD HH:mm:ss ZZ');
    const NEW_AUTHOR_NAME = "New Author Name";
    const NEW_AUTHOR_EMAIL = "new.author@example.com";

    const env = {
        ...process.env,
        GIT_COMMITTER_DATE: formattedDate,
        GIT_AUTHOR_DATE: formattedDate,
        GIT_AUTHOR_NAME: NEW_AUTHOR_NAME,
        GIT_AUTHOR_EMAIL: NEW_AUTHOR_EMAIL,
    };

    const command = `git commit --allow-empty -m "${message}"`;

    // Wir verwenden execPromise, um Env-Variablen korrekt zu übergeben
    await execPromise(command, { cwd: TEST_DIR_PATH, env });
    const log = await git.log();
    console.log(`✅ Commit erstellt: ${log.latest?.hash} — ${log.latest?.date}`);
}
