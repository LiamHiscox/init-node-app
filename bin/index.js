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
var yargs = __importStar(require("yargs"));
var new_1 = require("../lib/new");
// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
yargs
    .scriptName('init')
    .command('new <root>', 'initialize a new nodejs project in the root folder', function (yargs) {
    yargs
        .positional('root', { describe: 'root folder of the project', type: 'string' })
        .option('n', { alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean' })
        .option('g', { alias: 'git', describe: 'Initializes empty git repository', type: 'boolean' })
        .option('t', { alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean' })
        .option('d', { alias: 'docker', describe: 'Adds a docker-compose file', type: 'boolean' })
        .option('j', { alias: 'jest', describe: 'Adds jest for testing', type: 'boolean' })
        .option('html', { describe: 'Initializes HTML project', type: 'boolean' });
}, function (options) {
    new_1.initNew(options);
})
    .demandCommand(1, 1)
    .argv;
