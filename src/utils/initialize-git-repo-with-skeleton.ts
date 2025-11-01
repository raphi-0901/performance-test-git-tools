import * as simpleGit from 'simple-git';
import { type SimpleGit } from 'simple-git';
import * as fs from 'fs-extra';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import {TEST_DIR} from "./constants.js";

const execPromise = promisify(exec);
const REPO_PATH = join(process.cwd(), TEST_DIR);
const SKELETON_DIR_NAME = 'skeleton'; // Angenommen, der "skeleton"-Ordner befindet sich im selben Verzeichnis wie die Ausführung

/**
 * Erstellt den Ordner 'test-git-tools', initialisiert darin ein Git-Repository,
 * kopiert den Ordner "skeleton" in den neuen Ordner, staged alle Dateien und
 * erstellt einen initialen Commit.
 */
export async function initializeGitRepoWithSkeleton() {
    const REPO_PATH = join(process.cwd(), TEST_DIR);
    await fs.remove(REPO_PATH);

    console.log(`Starte Initialisierung in: ${REPO_PATH}`);
    console.log(`Erstelle Verzeichnis: ${REPO_PATH}`);
    await fs.ensureDir(REPO_PATH);

    const git = simpleGit.simpleGit(REPO_PATH);
    console.log('Initialisiere Git-Repository...');
    await git.init();

    // 3. Ordner "skeleton" in den neu erstellten Ordner kopieren
    const targetSkeletonPath = join(REPO_PATH, SKELETON_DIR_NAME);
    console.log(`Kopiere 'skeleton' von ${skeletonPath} nach ${targetSkeletonPath}`);
    await fs.copy(skeletonPath, targetSkeletonPath, { overwrite: true });

    // 4. Alle kopierten Dateien hinzufügen (stagen)
    console.log('Füge alle Dateien hinzu (git add .)...');
    await git.add('.');

    // 5. Initialen Commit erstellen
    console.log('Erstelle initialen Commit...');
    await git.commit('Initial commit with skeleton structure');

    console.log('Initialisierung abgeschlossen.');
    // Optional: Überprüfung
    // const status = await git.status();
    // console.log('Repository-Status:', status);
}

// Beispiel für die Verwendung:
// initializeGitRepoWithSkeleton()
//   .catch(err => console.error('Fehler während der Initialisierung:', err));
