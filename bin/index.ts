#!/usr/bin/env node

import {GitHandler} from "../lib/application/git-handler";
import {NpmHandler} from "../lib/application/npm-handler";
import {TypescriptHandler} from "../lib/application/typescript-handler";
import {HtmlHandler} from "../lib/application/html-handler";
import {DockerHandler} from "../lib/application/docker-handler";
import {FileHandler} from "../lib/tools/file-handler";
import * as yargs from "yargs";

const options = yargs
    .usage("Usage: -n")
    .option("n", {alias: "npm", describe: "npm init -y (Initialize NPM package)", type: "boolean"})
    .usage("Usage: -g")
    .option("g", {alias: "git", describe: "git init (Initialize empty git repository)", type: "boolean"})
    .usage("Usage: -t")
    .option("t", {alias: "tsc", describe: "tsc --init (Initialize typescript configuration)", type: "boolean"})
    .usage("Usage: -d")
    .option("d", {alias: "docker", describe: "Adds a docker-compose file", type: "boolean"})
    .usage("Usage: -j")
    .option("j", {alias: "jest", describe: "Adds jest to your project for testing", type: "boolean"})
    .usage("Usage: --html")
    .option("html", {describe: "Initialize HTML Project", type: "boolean"})
    .argv;


const SRC_PATH = 'src';
const WEB_PATH = 'web';

FileHandler.createDir(SRC_PATH);

if (options.npm) {
    NpmHandler.initialize();
    if (!options.tsc) {
        NpmHandler.createIndexFile(SRC_PATH);
    } else {
        TypescriptHandler.install();
        TypescriptHandler.createIndexFile(SRC_PATH);
    }
}
if (options.git) {
    GitHandler.initialize();
    GitHandler.gitIgnore();
}
if (options.tsc) {
    TypescriptHandler.initialize(SRC_PATH);
    TypescriptHandler.addScripts(SRC_PATH);
}
if (options.docker) {
    DockerHandler.initialize();
}
if (options.html) {
    HtmlHandler.initialize(WEB_PATH);
    if(options.tsc) {
        HtmlHandler.createScriptFile(WEB_PATH, 'ts');
        TypescriptHandler.initialize(WEB_PATH, true);
        TypescriptHandler.addScripts(WEB_PATH);
    } else {
        HtmlHandler.createScriptFile(WEB_PATH);
    }
}
if (options.jest) {
    NpmHandler.installPackage('jest');
    NpmHandler.installPackage('@types/jest');
}
