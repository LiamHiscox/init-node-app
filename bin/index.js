#!/usr/bin/env node
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { initNew } from "../lib/new-init.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
yargs(hideBin(process.argv))
    .scriptName('init')
    .command('new <root>', 'initialize a new nodejs project in the root folder', function (yargs) {
    yargs
        .positional('root', { describe: 'root folder of the project', type: 'string' })
        .check(function (_a) {
        var root = _a.root;
        if (root && root.trim()) {
            return true;
        }
        else {
            throw new Error('Please Provide a valid name for the project');
        }
    })
        .option('n', { alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean', default: false })
        .option('g', { alias: 'git', describe: 'Initializes empty git repository', type: 'boolean', default: false })
        .option('t', { alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean', default: false })
        .option('j', { alias: 'jest', describe: 'Adds jest for testing', type: 'boolean', default: false });
}, function (options) {
    initNew(__assign(__assign({}, options), { root: options.root.trim() }));
})
    .demandCommand(1, 1)
    .argv;
