import {PathHandler} from "./path-handler";
import {execSync} from "child_process";

export class ScriptRunner {
    static run = (script: string, dir: string = '') => {
        execSync(script, {
            stdio: 'ignore',
            cwd: PathHandler.fullPath(dir)
        });
    }

    static runPipe = (script: string, dir: string = ''): string => execSync(script, {
        stdio: 'pipe',
        cwd: PathHandler.fullPath(dir),
        encoding: 'utf8'
    }).trim();
}
