#!/usr/bin/env node

import {GitHandler} from '../lib/application/git-handler';
import {NpmHandler} from '../lib/application/npm-handler';
import {TypescriptHandler} from '../lib/application/typescript-handler';
import {HtmlHandler} from '../lib/application/html-handler';
import {DockerHandler} from '../lib/application/docker-handler';
import {FileHandler} from '../lib/tools/file-handler';
import * as yargs from 'yargs';
import {PackageConfig} from '../lib/tools/package-config';

// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
const options = yargs
    .scriptName('init')
    .usage('init <root>')
    .command('<root>','initialize a new nodejs project in the root folder', (yargs) => {
        yargs.positional('root', {describe: 'root folder of the project', type: 'string'})
    })
    .demandCommand(1, 1)
    .option('n', {alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean'})
    .option('g', {alias: 'git', describe: 'Initializes empty git repository', type: 'boolean'})
    .option('t', {alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean'})
    .option('d', {alias: 'docker', describe: 'Adds a docker-compose file', type: 'boolean'})
    .option('j', {alias: 'jest', describe: 'Adds jest for testing', type: 'boolean'})
    .option('html', {describe: 'Initializes HTML project', type: 'boolean'})
    .argv;


// TODO: validation
const projectName = options._[0].toString();

FileHandler.createDir(projectName);
process.chdir(projectName);

// TODO: move to separate file (init.js)
const SRC_PATH = 'src';
const WEB_PATH = 'web';

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
