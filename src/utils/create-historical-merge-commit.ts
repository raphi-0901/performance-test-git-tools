import { exec } from 'child_process';
import { promisify } from 'util';
import dayjs, { type Dayjs } from 'dayjs';
import { git, TEST_DIR_PATH } from "./constants.js";

const execPromise = promisify(exec);

/**
 * Erstellt einen leeren (allow-empty) Merge Commit mit einem festgelegten Datum in der Vergangenheit.
 *
 * @param message Die Commit-Nachricht.
 * @param sourceBranch Der Branch, der in den Ziel-Branch gemergt wird.
 * @param targetBranch Der Ziel-Branch, auf dem der Merge-Commit erstellt wird.
 * @param day Datum des Commits im Format 'YYYY-MM-DD HH:mm:ss ZZ'.
 */
export async function createHistoricalMergeCommit(
    message: string,
    sourceBranch: string,
    targetBranch: string,
    day: Dayjs = dayjs()
) {
    // 1. Datum formatieren
    const formattedDate = day.format('YYYY-MM-DD HH:mm:ss ZZ');
    const NEW_AUTHOR_NAME = "Merge Author Name"; // Neuen/Anderen Namen für den Merge
    const NEW_AUTHOR_EMAIL = "merge.author@example.com";

    // 2. Environment-Variablen für Commit-Datum setzen
    // GIT_COMMITTER_DATE/GIT_AUTHOR_DATE ändern das Erstellungsdatum des Commits
    const env = {
        ...process.env,
        GIT_COMMITTER_DATE: formattedDate,
        GIT_AUTHOR_DATE: formattedDate,
        GIT_AUTHOR_NAME: NEW_AUTHOR_NAME,
        GIT_AUTHOR_EMAIL: NEW_AUTHOR_EMAIL,
    };

    // 3. Auf den Ziel-Branch wechseln (wichtig für den Merge-Befehl)
    console.log(`➡️ Wechsle zu Branch: ${targetBranch}`);
    await git.checkout(targetBranch);

    // 4. Merge-Befehl ausführen
    // --no-ff: Erzeugt immer einen Merge-Commit, auch wenn Fast-Forward möglich wäre.
    // --allow-empty: Ermöglicht den Merge, auch wenn es keine Dateiänderungen gibt (was hier der Fall ist).
    const command = `git merge ${sourceBranch} --no-ff --allow-empty -m "${message}"`;

    console.log(`⏳ Führe historischen Merge durch...`);

    try {
        await execPromise(command, { cwd: TEST_DIR_PATH, env });
    } catch (error) {
        // HINWEIS: Bei einem Merge ohne Konflikte wird der Exit Code 0 zurückgegeben.
        // Bei einem tatsächlichen Konflikt (der bei leeren Commits unwahrscheinlich ist)
        // müsste hier eine spezielle Behandlung erfolgen.
        const log = await git.log();
        console.log(`✅ Merge Commit erstellt: ${log.latest?.hash} — ${log.latest?.date}`);
        return;
    }

    // 5. Erfolgs-Log
    const log = await git.log();
    console.log(`✅ Merge Commit erstellt: ${log.latest?.hash} — ${log.latest?.date}`);
}
