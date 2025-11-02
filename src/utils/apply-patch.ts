import * as simpleGit from 'simple-git';
import * as fs from 'fs-extra';
import { join } from 'path';
import {PATCH_PATH, TEST_DIR_PATH} from "./constants.js";

export async function applyPatch(patchName: string) {
    const patchPath = join(PATCH_PATH, `${patchName}.patch`);
    const exists = await fs.pathExists(patchPath);
    if (!exists) {
        console.error(`❌ Patch-Datei nicht gefunden: ${patchPath}`);
        return;
    }

    const git = simpleGit.simpleGit(TEST_DIR_PATH);
    console.log(`Use patch ${patchName} and apply it.`);
    try {
        // `git apply` ist der native Git-Befehl zum Einspielen von Patches
        await git.raw(['apply', patchPath]);

        console.log(`✅ Patch erfolgreich angewendet: ${patchPath}`);
    } catch (err) {
        console.error(`❌ Fehler beim Anwenden des Patches:`, err);
    }
}
