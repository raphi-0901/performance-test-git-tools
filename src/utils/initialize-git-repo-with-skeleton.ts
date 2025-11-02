import * as simpleGit from 'simple-git';
import * as fs from 'fs-extra';
import {SKELETON_PATH, TEST_DIR_PATH} from "./constants.js";
import {createHistoricalCommit} from "./create-historical-commit.js";
import dayjs from 'dayjs';

/**
 * Erstellt den Ordner 'test-git-tools', initialisiert darin ein Git-Repository,
 * kopiert den Ordner "skeleton" in den neuen Ordner, staged alle Dateien und
 * erstellt einen initialen Commit.
 */
export async function initializeGitRepoWithSkeleton() {
    await fs.remove(TEST_DIR_PATH);

    console.log(`Starte Initialisierung in: ${TEST_DIR_PATH}`);
    console.log(`Erstelle Verzeichnis: ${TEST_DIR_PATH}`);
    await fs.ensureDir(TEST_DIR_PATH);

    const git = simpleGit.simpleGit(TEST_DIR_PATH);
    console.log('Initialisiere Git-Repository...');
    await git.init();

    console.log(`Kopiere 'skeleton' von ${SKELETON_PATH} nach ${TEST_DIR_PATH}`);
    await fs.copy(SKELETON_PATH, TEST_DIR_PATH, { overwrite: true });

    await git.add('.');
    await createHistoricalCommit("Initial commit with skeleton structure", dayjs().subtract(1, 'year'))

    console.log('Initialisierung abgeschlossen.');
}
