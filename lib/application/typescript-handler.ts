import {FileHandler} from "../tools/file-handler.js";
import {PathHandler} from "../tools/path-handler.js";
import {PackageConfig} from "../tools/package-config.js";
import {TsConfig} from "../tools/ts-config.js";
import {NpmHandler} from "./npm-handler.js";

const EXCLUSION_LIST = ["node_modules", "**/*.test.ts", "**/*.spec.ts"];

export class TypescriptHandler {
    static initialize = (dir: string = '') => {
        const configJSON = TsConfig.getTsConfigJSON();

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
            [`build-${dir}`]: `tsc -p ${TsConfig.getTsConfigName(dir)}`,
            [`watch-${dir}`]: `tsc -w -p ${TsConfig.getTsConfigName(dir)}`
        } : {
            "build": "tsc",
            "watch": "tsc -w"
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
