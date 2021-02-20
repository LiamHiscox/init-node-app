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
var options = yargs
    .usage("Usage: -n")
    .option("n", { alias: "npm", describe: "npm init -y (Initialize NPM package)", type: "boolean" })
    .usage("Usage: -g")
    .option("g", { alias: "git", describe: "git init (Initialize empty git repository)", type: "boolean" })
    .usage("Usage: -t")
    .option("t", { alias: "tsc", describe: "tsc --init (Initialize typescript configuration)", type: "boolean" })
    .usage("Usage: -d")
    .option("d", { alias: "docker", describe: "Adds a docker-compose file", type: "boolean" })
    .usage("Usage: -j")
    .option("j", { alias: "jest", describe: "Adds jest to your project for testing", type: "boolean" })
    .usage("Usage: --html")
    .option("html", { describe: "Initialize HTML Project", type: "boolean" })
    .argv;
var SRC_PATH = 'src';
var WEB_PATH = 'web';
file_handler_1.FileHandler.createDir(SRC_PATH);
if (options.npm) {
    npm_handler_1.NpmHandler.initialize();
    if (!options.tsc) {
        npm_handler_1.NpmHandler.createIndexFile(SRC_PATH);
    }
    else {
        typescript_handler_1.TypescriptHandler.install();
        typescript_handler_1.TypescriptHandler.createIndexFile(SRC_PATH);
    }
}
if (options.git) {
    git_handler_1.GitHandler.initialize();
    git_handler_1.GitHandler.gitIgnore();
}
if (options.tsc) {
    typescript_handler_1.TypescriptHandler.initialize(SRC_PATH);
    typescript_handler_1.TypescriptHandler.addScripts(SRC_PATH);
}
if (options.docker) {
    docker_handler_1.DockerHandler.initialize();
}
if (options.html) {
    html_handler_1.HtmlHandler.initialize(WEB_PATH);
    if (options.tsc) {
        html_handler_1.HtmlHandler.createScriptFile(WEB_PATH, 'ts');
        typescript_handler_1.TypescriptHandler.initialize(WEB_PATH, true);
        typescript_handler_1.TypescriptHandler.addScripts(WEB_PATH);
    }
    else {
        html_handler_1.HtmlHandler.createScriptFile(WEB_PATH);
    }
}
if (options.jest) {
    npm_handler_1.NpmHandler.installPackage('jest');
    npm_handler_1.NpmHandler.installPackage('@types/jest');
}
