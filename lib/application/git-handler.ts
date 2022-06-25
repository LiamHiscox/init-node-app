import {FileHandler} from "../tools/file-handler.js";
import {ScriptRunner} from "../tools/script-runner.js";

export class GitHandler {
    static initialize = () => {
        ScriptRunner.run('git init');
    };

    static gitIgnore = () => {
        const ignore = FileHandler.read('template.gitignore', true);
        FileHandler.write('.gitignore', ignore);
    };
}
