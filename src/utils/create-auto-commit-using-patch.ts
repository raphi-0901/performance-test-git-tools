import dayjs, { type Dayjs } from 'dayjs';
import { git } from './constants.js';
import {applyPatch} from "./apply-patch.js";
import {createAutoCommit} from "./create-auto-commit.js";
import {createHistoricalCommit} from "./create-historical-commit.js";

export async function createAutoCommitUsingPatch(patchName: string, dryRun = false, day: Dayjs = dayjs()) {
    await applyPatch(patchName);
    await git.add('.')

    if(!dryRun) {
        await createAutoCommit(day)
    } else {
        await createHistoricalCommit(`dry-run commit of patch: ${patchName}`, day)
    }
}
