import dayjs, { type Dayjs } from 'dayjs';
import { git } from './constants.js';
import {applyPatch} from "./apply-patch.js";
import {createAutoCommit} from "./create-auto-commit.js";

export async function createAutoCommitUsingPatch(patchName: string, day: Dayjs = dayjs()) {
    await applyPatch(patchName);
    await git.add('.')
    await createAutoCommit(day)
}
