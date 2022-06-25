import * as yargs from 'yargs';
import {FileHandler} from "./tools/file-handler.js";
import {PackageConfig} from "./tools/package-config.js";
import {NpmHandler} from "./application/npm-handler.js";
import {GitHandler} from "./application/git-handler.js";
import {TypescriptHandler} from "./application/typescript-handler.js";
import {ScriptRunner} from "./tools/script-runner.js";

export interface InitNewModel {
    _: string[],
    '$0': string,
    root: string,
    npm: boolean,
    git: boolean,
    tsc: boolean,
    jest: boolean
}

const SRC_PATH = 'src';

export const initNew = (options: yargs.Arguments<InitNewModel>) => {
    FileHandler.createDir(options.root);
    process.chdir(options.root);
    FileHandler.createDir(SRC_PATH);

    if (options.npm) {
        PackageConfig.setMain('index.js', SRC_PATH)
        NpmHandler.initialize();
    }
    if (options.git) {
        GitHandler.initialize();
        GitHandler.gitIgnore();
    }
    if (options.tsc) {
        TypescriptHandler.createIndexFile(SRC_PATH);
        TypescriptHandler.install();
        TypescriptHandler.initialize(SRC_PATH);
        TypescriptHandler.addScripts(SRC_PATH);
    } else {
        NpmHandler.createIndexFile(SRC_PATH);
    }
    if (options.jest && !options.tsc) {
        NpmHandler.installPackage('jest');
        PackageConfig.addScripts({'test': 'jest'});
    }
    if (options.jest && options.tsc) {
        NpmHandler.installPackage('jest');
        NpmHandler.installPackage('@types/jest');
        NpmHandler.installPackage('ts-jest');
        PackageConfig.addScripts({'test': 'jest'});
        ScriptRunner.run('npx ts-jest config:init');
    }
}
