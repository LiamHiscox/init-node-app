import {FileHandler} from "./file-handler";

const FILE_NAME = 'package.json';

interface PackageJson {
    scripts: Scripts;
}

interface Scripts {
    [key: string]: string;
}

export class PackageConfig {
    static getPackageJSON = (): PackageJson|null => {
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
            console.log("No package.json file found to add script");
        }
    }
}
