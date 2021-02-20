import {FileHandler} from "../tools/file-handler";
import {ScriptRunner} from "../tools/script-runner";
import {PathHandler} from "../tools/path-handler";

const INDEX_FILE = 'index.js';
const INIT_SCRIPT = 'npm init -y';

export class NpmHandler {
    static initialize = () => {
        ScriptRunner.run(INIT_SCRIPT);
    };

    static createIndexFile = (dir: string = '') => {
        FileHandler.create(PathHandler.join(dir, INDEX_FILE));
    };

    static installPackage = (npmPackage: string, saveDev: boolean = true) => {
        ScriptRunner.run(`npm install ${npmPackage} --${saveDev ? 'save-dev' : 'save'}`);
    };
}
