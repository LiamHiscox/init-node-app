import {Arguments} from 'yargs';
import {FileHandler} from "./tools/file-handler";
import {PackageConfig} from "./tools/package-config";
import {NpmHandler} from "./application/npm-handler";
import {GitHandler} from "./application/git-handler";
import {TypescriptHandler} from "./application/typescript-handler";
import {ScriptRunner} from "./tools/script-runner";
import Logger from "./tools/logger";

export interface InitNewModel {
    _: string[],
    '$0': string,
    root: string,
    npm: boolean,
    git: boolean,
    tsc: boolean,
    jest: boolean,
    packages: string[]
}

const SRC_PATH = 'src';

export const initNew = (options: Arguments<InitNewModel>) => {
    FileHandler.createDir(options.root);
    process.chdir(options.root);
    FileHandler.createDir(SRC_PATH);
    const npmHandler = new NpmHandler();
    options.packages.forEach(p => npmHandler.addPackage(p));

    if (options.npm) {
        Logger.info('Initializing NPM');
        NpmHandler.initialize();
        PackageConfig.setMain('index.js', SRC_PATH);
        Logger.success('Initialized NPM');
    }
    if (options.git) {
        Logger.info('Initializing Git');
        GitHandler.initialize();
        GitHandler.gitIgnore();
        Logger.success('Initialized Git');
    }
    if (options.tsc) {
        Logger.info('Initializing TypeScript');
        TypescriptHandler.createIndexFile(SRC_PATH);
        TypescriptHandler.install(npmHandler);
        TypescriptHandler.initialize(SRC_PATH);
        TypescriptHandler.addScripts();
        Logger.success('Initialized TypeScript');
    } else {
        NpmHandler.createIndexFile(SRC_PATH);
    }
    if (options.jest && !options.tsc) {
        Logger.info('Initializing Jest');
        npmHandler.addPackage('jest');
        PackageConfig.addScripts({'test': 'jest'});
        Logger.success('Initialized Jest');
    }
    if (options.jest && options.tsc) {
        Logger.info('Initializing Jest');
        npmHandler.addPackage('jest');
        npmHandler.addPackage('@types/jest');
        npmHandler.addPackage('ts-jest');
        PackageConfig.addScripts({'test': 'jest'});
        Logger.success('Initialized Jest');
    }
    npmHandler.installPackages();
    if (options.jest && options.tsc) {
        Logger.info('Configuring Jest');
        ScriptRunner.run('npx ts-jest config:init');
        Logger.success('Configured Jest');
    }
    Logger.success('Initialized Node.js project successfully');
}
