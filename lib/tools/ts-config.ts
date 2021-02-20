import {FileHandler} from "./file-handler";

const FILE_PATH_WEB =  'tsc/tsconfig.web.json';
const FILE_PATH_NODE = 'tsc/tsconfig.node.json';

export interface TsConfigModel {
    [key: string]: any
}

export class TsConfig {
    static getTsConfigName = (project: string|undefined): string => {
        return project ? `tsconfig.${project}.json` : 'tsconfig.json';
    };

    static getTsConfigJSON = (web: boolean = false): TsConfigModel => {
        return FileHandler.readJSON(web ? FILE_PATH_WEB : FILE_PATH_NODE, true);
    };

    static setTsConfigOption = (tsConfigJSON: TsConfigModel, tsConfig: TsConfigModel): TsConfigModel => ({
        ...tsConfigJSON,
        ...tsConfig
    });

    static setCompilerOptions = (tsConfigJSON: TsConfigModel, tsConfig: TsConfigModel): TsConfigModel => ({
        ...tsConfigJSON,
        compilerOptions: {
            ...tsConfigJSON.compilerOptions,
            ...tsConfig
        }
    });
}
