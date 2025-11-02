import { spawn } from 'child_process';
import dayjs, { type Dayjs } from 'dayjs';
import { git, TEST_DIR_PATH } from './constants.js';

export async function createAutoCommit(day: Dayjs = dayjs()) {
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

    const proc = spawn('git-tools', ['auto-commit'], {
        cwd: TEST_DIR_PATH,
        env,
        stdio: ['pipe', 'inherit', 'inherit'], // stdin: pipe, stdout/stderr: direkt an Terminal
    });

    // Eingaben automatisieren (wenn nötig)
    proc.stdin.write('y\n');
    proc.stdin.end();

    await new Promise((resolve, reject) => {
        proc.on('exit', code => {
            if (code === 0) resolve(undefined);
            else reject(new Error(`git-tools exited with code ${code}`));
        });
    });

    const log = await git.log();
    console.log(`✅ Commit erstellt: ${log.latest?.hash} — ${log.latest?.date}`);
}
