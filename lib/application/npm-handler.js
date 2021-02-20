"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmHandler = void 0;
var file_handler_1 = require("../tools/file-handler");
var script_runner_1 = require("../tools/script-runner");
var path_handler_1 = require("../tools/path-handler");
var INDEX_FILE = 'index.js';
var INIT_SCRIPT = 'npm init -y';
var NpmHandler = /** @class */ (function () {
    function NpmHandler() {
    }
    NpmHandler.initialize = function () {
        script_runner_1.ScriptRunner.run(INIT_SCRIPT);
    };
    NpmHandler.createIndexFile = function (dir) {
        if (dir === void 0) { dir = ''; }
        file_handler_1.FileHandler.create(path_handler_1.PathHandler.join(dir, INDEX_FILE));
    };
    NpmHandler.installPackage = function (npmPackage, saveDev) {
        if (saveDev === void 0) { saveDev = true; }
        script_runner_1.ScriptRunner.run("npm install " + npmPackage + " --" + (saveDev ? 'save-dev' : 'save'));
    };
    return NpmHandler;
}());
exports.NpmHandler = NpmHandler;
