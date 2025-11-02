import {join} from "path";
import * as simpleGit from "simple-git";

export const TEST_DIR_NAME = "test-git-tools";
export const SKELETON_DIR_NAME = "skeleton";
export const PATCH_DIR_NAME = "diffs";
export const PATCH_PATH = join(process.cwd(), PATCH_DIR_NAME)
export const SKELETON_PATH = join(process.cwd(), SKELETON_DIR_NAME)
export const TEST_DIR_PATH = join(process.cwd(), TEST_DIR_NAME)
export const git = simpleGit.simpleGit(TEST_DIR_PATH);
