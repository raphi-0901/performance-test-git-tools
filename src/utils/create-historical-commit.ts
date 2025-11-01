import * as simpleGit from 'simple-git';
import { type SimpleGit } from 'simple-git';
import * as fs from 'fs-extra';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const TEST_DIR = 'test-git-tools';
const REPO_PATH = join(process.cwd(), TEST_DIR);

/**
 * Erstellt einen Commit mit einem festgelegten Datum in der Vergangenheit.
 * @param message Die Commit-Nachricht.
 * @param dateString Datum im Format 'YYYY-MM-DD HH:MM:SS Z'.
 */
export async function createHistoricalCommit(
    message: string,
    dateString: string
) {
    const NEW_AUTHOR_NAME = "New Author Name";
    const NEW_AUTHOR_EMAIL = "new.author@example.com";

    const env = {
        ...process.env,
        GIT_COMMITTER_DATE: dateString,
        GIT_AUTHOR_DATE: dateString,
        GIT_AUTHOR_NAME: NEW_AUTHOR_NAME,
        GIT_AUTHOR_EMAIL: NEW_AUTHOR_EMAIL,
    };

    // sicherstellen, dass das Repo existiert
    if (!(await fs.pathExists(REPO_PATH))) {
        await fs.mkdirp(REPO_PATH);
        const initGit = simpleGit.simpleGit(REPO_PATH);
        await initGit.init();
    }

    // SimpleGit-Instanz für das Ziel-Repo
    const git: SimpleGit = simpleGit.simpleGit(REPO_PATH);

    // Commit-Befehl, um Datum zu manipulieren
    const command = `git commit --allow-empty -m "${message}"`;

    // Wir verwenden execPromise, um Env-Variablen korrekt zu übergeben
    await execPromise(command, { cwd: REPO_PATH, env });

    // Optional: Commit-Log zur Kontrolle
    const log = await git.log({ maxCount: 1 });
    console.log(`✅ Commit erstellt: ${log.latest?.hash} — ${log.latest?.date}`);

    console.log('simepli :>> ', await git.log());
}
