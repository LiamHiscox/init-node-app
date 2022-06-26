import {FileHandler} from "../tools/file-handler";
import {ScriptRunner} from "../tools/script-runner";
import {PathHandler} from "../tools/path-handler";
import Logger from "../tools/logger";

const INDEX_FILE = 'index.js';
const INIT_SCRIPT = 'npm init -y';

export class NpmHandler {
    private packages: string[] = [];

    static initialize = () => {
        ScriptRunner.run(INIT_SCRIPT);
    };

    static createIndexFile = (dir: string) => {
        FileHandler.create(PathHandler.join(dir, INDEX_FILE));
    };

    addPackage = (npmPackage: string) => {
        this.packages.push(npmPackage);
    }

    installPackages = () => {
        if (this.packages.length > 0) {
            Logger.info(`Installing packages ${this.packages.join(' ')}`);
            const packageList = this.packages.join(' ');
            ScriptRunner.run(`npm install ${packageList} --save-dev`);
            Logger.success('Installed packages');
        }
    }
}
