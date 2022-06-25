import {FileHandler} from "./file-handler.js";
import {PathHandler} from "./path-handler.js";

const FILE_NAME = 'package.json';

interface PackageJson {
    scripts: Scripts;
}

interface Scripts {
    [key: string]: string;
}

export class PackageConfig {
    static getPackageJSON = (): PackageJson | null => {
        return FileHandler.find(FILE_NAME) ?
            FileHandler.readJSON(FILE_NAME) :
            null;
    };

    static addScripts = (scripts: Scripts) => {
        const packageJson = PackageConfig.getPackageJSON();

        if (packageJson) {
            const newPackageJson = {
                ...packageJson,
                scripts: {
                    ...packageJson.scripts,
                    ...scripts
                }
            };
            FileHandler.writeJSON(FILE_NAME, newPackageJson);
        } else {
            console.error("No package.json file found to add script");
        }
    }

    static setMain = (name: string, dir: string = '') => {
        const packageJson = PackageConfig.getPackageJSON();

        if (packageJson) {
            const newPackageJson = {
                ...packageJson,
                'main': PathHandler.join(dir, name),
            };
            FileHandler.writeJSON(FILE_NAME, newPackageJson);
        } else {
            console.error("No package.json file found to set main for");
        }
    }

    static filterScriptKeys = (subString: string): string[] => {
        return Object
            .keys(PackageConfig.getScripts())
            .filter(scriptKey => scriptKey.includes(subString));
    }

    static getScripts = (): Scripts => {
        const packageJson = PackageConfig.getPackageJSON();
        return packageJson ? packageJson.scripts : {};
    }
}
