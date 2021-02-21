#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var newInit_1 = require("../lib/newInit");
var yargs_1 = __importDefault(require("yargs"));
// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
yargs_1.default
    .scriptName('init')
    .command('new <root>', 'initialize a new nodejs project in the root folder', function (yargs) {
    yargs
        .positional('root', { describe: 'root folder of the project', type: 'string' })
        .check(function (argv, options) {
        console.log('options', options);
        console.log('argv', argv);
        return true;
    })
        .option('n', { alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean', default: false })
        .option('g', { alias: 'git', describe: 'Initializes empty git repository', type: 'boolean', default: false })
        .option('t', { alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean', default: false })
        .option('d', { alias: 'docker', describe: 'Adds a docker-compose file', type: 'boolean', default: false })
        .option('j', { alias: 'jest', describe: 'Adds jest for testing', type: 'boolean', default: false })
        .option('html', { describe: 'Initializes HTML project', type: 'boolean', default: false });
}, function (options) {
    if (options.root && options.root.trim()) {
        newInit_1.initNew(options);
    }
    else {
        console.error('invalid project name given');
    }
})
    .demandCommand(1, 1)
    .argv;
