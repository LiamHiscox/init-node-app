import VersionHandler from "./version-handler";
import defaultConfig from "../assets/tsconfig.default.json";
import node10 from "@tsconfig/node10/tsconfig.json";
import node12 from "@tsconfig/node12/tsconfig.json";
import node14 from "@tsconfig/node14/tsconfig.json";
import node16 from "@tsconfig/node16/tsconfig.json";

export interface TsConfigModel {
    [key: string]: any;
}

const nodeToConfigList: { version: number, config: TsConfigModel }[] = [
    {version: 10, config: node10},
    {version: 12, config: node12},
    {version: 14, config: node14},
    {version: 16, config: node16}
];

export class TsConfig {
    static tsConfigName = 'tsconfig.json';

    static getTsConfigJSON = (): TsConfigModel => {
        const nodeMajorVersion = VersionHandler.parsedNodeVersion()[0];
        return nodeToConfigList.reduce((bestConfig: TsConfigModel, {version, config}) =>
            (nodeMajorVersion >= version ? config : bestConfig), defaultConfig);
    };

    static setTsConfigOption = (tsConfigJSON: TsConfigModel, tsConfig: TsConfigModel): TsConfigModel => ({
        ...tsConfigJSON,
        ...tsConfig
    });
}
