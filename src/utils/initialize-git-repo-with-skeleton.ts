import * as simpleGit from 'simple-git';
import * as fs from 'fs-extra';
import { join } from 'path';
import {SKELETON_PATH, TEST_DIR_NAME} from "./constants.js";
import {createHistoricalCommit} from "./create-historical-commit.js";
import dayjs from 'dayjs';

/**
 * Erstellt den Ordner 'test-git-tools', initialisiert darin ein Git-Repository,
 * kopiert den Ordner "skeleton" in den neuen Ordner, staged alle Dateien und
 * erstellt einen initialen Commit.
 */
export async function initializeGitRepoWithSkeleton() {
    const REPO_PATH = join(process.cwd(), TEST_DIR_NAME);
    await fs.remove(REPO_PATH);

    console.log(`Starte Initialisierung in: ${REPO_PATH}`);
    console.log(`Erstelle Verzeichnis: ${REPO_PATH}`);
    await fs.ensureDir(REPO_PATH);

    const git = simpleGit.simpleGit(REPO_PATH);
    console.log('Initialisiere Git-Repository...');
    await git.init();

    console.log(`Kopiere 'skeleton' von ${SKELETON_PATH} nach ${REPO_PATH}`);
    await fs.copy(SKELETON_PATH, REPO_PATH, { overwrite: true });

    await git.add('.');
    await createHistoricalCommit("Initial commit with skeleton structure", dayjs().subtract(1, 'year'))

    console.log('Initialisierung abgeschlossen.');
}
