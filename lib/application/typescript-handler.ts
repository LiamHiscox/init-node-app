import {FileHandler} from "../tools/file-handler";
import {PathHandler} from "../tools/path-handler";
import {PackageConfig} from "../tools/package-config";
import {TsConfig} from "../tools/ts-config";
import {NpmHandler} from "./npm-handler";

const EXCLUSION_LIST = ["node_modules", "**/*.test.ts", "**/*.spec.ts"];

export class TypescriptHandler {
    static initialize = (dir: string) => {
        const configJSON = TsConfig.getTsConfigJSON();
        const tsConfig = TsConfig.setTsConfigOption(configJSON, {
            "include": [`${dir}/**/*`],
            "exclude": EXCLUSION_LIST
        });
        FileHandler.writeJSON(TsConfig.tsConfigName, tsConfig);
    };

    static addScripts = () => {
        const scripts = {
            'build': 'tsc',
            'watch': 'tsc -w'
        }
        PackageConfig.addScripts(scripts);
    };

    static createIndexFile = (dir: string) => {
        FileHandler.create(PathHandler.join(dir, 'index.ts'));
    };

    static install = (npmHandler: NpmHandler) => {
        npmHandler.addPackage('typescript');
        npmHandler.addPackage('@types/node');
    };
}
