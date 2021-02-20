"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptRunner = void 0;
var path_handler_1 = require("./path-handler");
var child_process_1 = require("child_process");
var ScriptRunner = /** @class */ (function () {
    function ScriptRunner() {
    }
    ScriptRunner.run = function (script, dir) {
        if (dir === void 0) { dir = ''; }
        child_process_1.execSync(script, { stdio: 'inherit', cwd: path_handler_1.PathHandler.fullPath(dir) });
    };
    return ScriptRunner;
}());
exports.ScriptRunner = ScriptRunner;
