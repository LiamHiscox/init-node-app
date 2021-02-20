"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHandler = void 0;
var file_handler_1 = require("../tools/file-handler");
var script_runner_1 = require("../tools/script-runner");
var GitHandler = /** @class */ (function () {
    function GitHandler() {
    }
    GitHandler.initialize = function () {
        script_runner_1.ScriptRunner.run('git init');
    };
    GitHandler.gitIgnore = function () {
        var ignore = file_handler_1.FileHandler.read('template.gitignore', true);
        file_handler_1.FileHandler.write('.gitignore', ignore);
    };
    return GitHandler;
}());
exports.GitHandler = GitHandler;
