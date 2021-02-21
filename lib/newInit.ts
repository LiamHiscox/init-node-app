import * as yargs from 'yargs';
import {FileHandler} from "./tools/file-handler";
import {PackageConfig} from "./tools/package-config";
import {NpmHandler} from "./application/npm-handler";
import {GitHandler} from "./application/git-handler";
import {TypescriptHandler} from "./application/typescript-handler";
import {DockerHandler} from "./application/docker-handler";
import {HtmlHandler} from "./application/html-handler";

export interface InitNewModel {
    _: string[],
    '$0': string,
    root: string,
    npm: boolean,
    git: boolean,
    tsc: boolean,
    docker: boolean,
    jest: boolean,
    html: boolean
}

export const initNew = (options: yargs.Arguments<InitNewModel>) => {
    FileHandler.createDir(options.root);
    process.chdir(options.root);

    const SRC_PATH = 'src';
    const WEB_PATH = 'web';

    FileHandler.createDir(SRC_PATH);

    if (options.npm) {
        // TODO: add global config file for constants
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
    if (options.docker) {
        DockerHandler.initialize();
    }
    if (options.html && options.tsc) {
        HtmlHandler.initialize(WEB_PATH);
        HtmlHandler.createScriptFile(WEB_PATH, 'ts');
        TypescriptHandler.initialize(WEB_PATH, true);
        TypescriptHandler.addScripts(WEB_PATH);
    }
    if (options.html && !options.tsc) {
        HtmlHandler.initialize(WEB_PATH);
        HtmlHandler.createScriptFile(WEB_PATH);
    }
    if (options.jest && !options.tsc) {
        NpmHandler.installPackage('jest');
        PackageConfig.addScripts({'test': 'jest'});
    }
    if (options.jest && options.tsc) {
        NpmHandler.installPackage('jest');
        NpmHandler.installPackage('@types/jest');
        const testScript = PackageConfig
            .filterScriptKeys('build')
            .map(script => `npm run ${script}`)
            .concat('jest')
            .join(' && ');
        PackageConfig.addScripts({'test': testScript});
    }
}
