#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var git_handler_1 = require("../lib/application/git-handler");
var npm_handler_1 = require("../lib/application/npm-handler");
var typescript_handler_1 = require("../lib/application/typescript-handler");
var html_handler_1 = require("../lib/application/html-handler");
var docker_handler_1 = require("../lib/application/docker-handler");
var file_handler_1 = require("../lib/tools/file-handler");
var yargs = __importStar(require("yargs"));
var package_config_1 = require("../lib/tools/package-config");
// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
var options = yargs
    .scriptName('init')
    .usage('init <root>')
    .command('<root>', 'initialize a new nodejs project in the root folder', function (yargs) {
    yargs.positional('root', { describe: 'root folder of the project', type: 'string' });
})
    .demandCommand(1, 1)
    .option('n', { alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean' })
    .option('g', { alias: 'git', describe: 'Initializes empty git repository', type: 'boolean' })
    .option('t', { alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean' })
    .option('d', { alias: 'docker', describe: 'Adds a docker-compose file', type: 'boolean' })
    .option('j', { alias: 'jest', describe: 'Adds jest for testing', type: 'boolean' })
    .option('html', { describe: 'Initializes HTML project', type: 'boolean' })
    .argv;
// TODO: validation
var projectName = options._[0].toString();
file_handler_1.FileHandler.createDir(projectName);
process.chdir(projectName);
// TODO: move to separate file (init.js)
var SRC_PATH = 'src';
var WEB_PATH = 'web';
file_handler_1.FileHandler.createDir(SRC_PATH);
if (options.npm) {
    package_config_1.PackageConfig.setMain('index.js', SRC_PATH);
    npm_handler_1.NpmHandler.initialize();
}
if (options.git) {
    git_handler_1.GitHandler.initialize();
    git_handler_1.GitHandler.gitIgnore();
}
if (options.tsc) {
    typescript_handler_1.TypescriptHandler.createIndexFile(SRC_PATH);
    typescript_handler_1.TypescriptHandler.install();
    typescript_handler_1.TypescriptHandler.initialize(SRC_PATH);
    typescript_handler_1.TypescriptHandler.addScripts(SRC_PATH);
}
else {
    npm_handler_1.NpmHandler.createIndexFile(SRC_PATH);
}
if (options.docker) {
    docker_handler_1.DockerHandler.initialize();
}
if (options.html && options.tsc) {
    html_handler_1.HtmlHandler.initialize(WEB_PATH);
    html_handler_1.HtmlHandler.createScriptFile(WEB_PATH, 'ts');
    typescript_handler_1.TypescriptHandler.initialize(WEB_PATH, true);
    typescript_handler_1.TypescriptHandler.addScripts(WEB_PATH);
}
if (options.html && !options.tsc) {
    html_handler_1.HtmlHandler.initialize(WEB_PATH);
    html_handler_1.HtmlHandler.createScriptFile(WEB_PATH);
}
if (options.jest && !options.tsc) {
    npm_handler_1.NpmHandler.installPackage('jest');
    package_config_1.PackageConfig.addScripts({ 'test': 'jest' });
}
if (options.jest && options.tsc) {
    npm_handler_1.NpmHandler.installPackage('jest');
    npm_handler_1.NpmHandler.installPackage('@types/jest');
    var testScript = package_config_1.PackageConfig
        .filterScriptKeys('build')
        .map(function (script) { return "npm run " + script; })
        .concat('jest')
        .join(' && ');
    package_config_1.PackageConfig.addScripts({ 'test': testScript });
}
