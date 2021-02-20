import {FileHandler} from "../tools/file-handler";
import {PathHandler} from "../tools/path-handler";
import {PackageConfig} from "../tools/package-config";
import {TsConfig} from "../tools/ts-config";
import {NpmHandler} from "./npm-handler";

const EXCLUSION_LIST = ["node_modules", "**/*.test.ts", "**/*.spec.ts"];

export class TypescriptHandler {
    static initialize = (dir: string = '', web: boolean = false) => {
        const configJSON = TsConfig.getTsConfigJSON(web);

        const tsConfig = dir ? TsConfig.setTsConfigOption(configJSON, {
            "include": [`${dir}/**/*`],
            "exclude": EXCLUSION_LIST
        }) : TsConfig.setTsConfigOption(configJSON, {
            "exclude": EXCLUSION_LIST
        });

        FileHandler.writeJSON(TsConfig.getTsConfigName(dir), tsConfig);
    };

    static addScripts = (dir: string = '') => {
        const scripts = dir ? {
            [`build-${dir}:tsc`]: `tsc -p ${TsConfig.getTsConfigName(dir)}`,
            [`watch-${dir}:tsc`]: `tsc -w -p ${TsConfig.getTsConfigName(dir)}`
        } : {
            "build:tsc": "tsc",
            "watch:tsc": "tsc -w"
        };
        PackageConfig.addScripts(scripts);
    };

    static createIndexFile = (dir: string = '') => {
        FileHandler.create(PathHandler.join(dir, 'index.ts'));
    };

    static install = () => {
        NpmHandler.installPackage('typescript');
        NpmHandler.installPackage('@types/node');
    };
}
