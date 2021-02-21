#!/usr/bin/env node

import * as yargs from 'yargs';
import {initNew, InitNewModel} from "../lib/new";
import {Arguments} from "yargs";

// TODO: add passing of list of npm packages to install (plus @types if tsc set to true)
yargs
    .scriptName('init')
    .command(
        'new <root>',
        'initialize a new nodejs project in the root folder',
        (yargs) => {
            yargs
                .positional('root', {describe: 'root folder of the project', type: 'string'})
                .option('n', {alias: 'npm', describe: 'Initializes NPM configuration', type: 'boolean', default: false})
                .option('g', {alias: 'git', describe: 'Initializes empty git repository', type: 'boolean', default: false})
                .option('t', {alias: 'tsc', describe: 'Initializes typescript configuration', type: 'boolean', default: false})
                .option('d', {alias: 'docker', describe: 'Adds a docker-compose file', type: 'boolean', default: false})
                .option('j', {alias: 'jest', describe: 'Adds jest for testing', type: 'boolean', default: false})
                .option('html', {describe: 'Initializes HTML project', type: 'boolean', default: false})
        },
        (options: Arguments<InitNewModel>) => {
            if (options.root && options.root.trim()) {
                initNew(options)
            } else {
                console.error('invalid project name given')
            }
        })
    .demandCommand(1, 1)
    .argv;
