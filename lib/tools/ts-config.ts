import {FileHandler} from "./file-handler.js";

const FILE_PATH_NODE = 'tsconfig.node.json';

export interface TsConfigModel {
    [key: string]: any
}

export class TsConfig {
    static

    getTsConfigName = (project: string | undefined): string => {
        return project ? `tsconfig.${project}.json` : 'tsconfig.json';
    };

    static getTsConfigJSON = (): TsConfigModel => {
        return FileHandler.readJSON(FILE_PATH_NODE, true);
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
