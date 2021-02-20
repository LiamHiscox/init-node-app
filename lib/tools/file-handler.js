"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
var path_handler_1 = require("./path-handler");
var fs = require('fs');
var FileHandler = /** @class */ (function () {
    function FileHandler() {
    }
    FileHandler.readJSON = function (path, assets) {
        if (assets === void 0) { assets = false; }
        return JSON.parse(FileHandler.read(path, assets));
    };
    FileHandler.read = function (dir, assets) {
        if (assets === void 0) { assets = false; }
        return fs.readFileSync(path_handler_1.PathHandler.fullPath(dir, assets)).toString();
    };
    FileHandler.writeJSON = function (dir, content) {
        if (dir === void 0) { dir = ''; }
        FileHandler.write(dir, JSON.stringify(content, null, 2));
    };
    FileHandler.write = function (dir, content) {
        fs.writeFileSync(path_handler_1.PathHandler.fullPath(dir), content);
    };
    FileHandler.find = function (dir) {
        return fs.existsSync(path_handler_1.PathHandler.fullPath(dir));
    };
    FileHandler.create = function (dir) {
        fs.appendFileSync(path_handler_1.PathHandler.fullPath(dir), '');
    };
    FileHandler.createDir = function (dir) {
        !FileHandler.find(dir) ? fs.mkdirSync(path_handler_1.PathHandler.fullPath(dir)) : null;
    };
    FileHandler.copy = function (from, to, fromAssets) {
        if (fromAssets === void 0) { fromAssets = false; }
        fs.copyFileSync(path_handler_1.PathHandler.fullPath(from, fromAssets), path_handler_1.PathHandler.fullPath(to));
    };
    return FileHandler;
}());
exports.FileHandler = FileHandler;
