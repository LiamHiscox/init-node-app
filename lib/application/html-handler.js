"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlHandler = void 0;
var file_handler_1 = require("../tools/file-handler");
var path_handler_1 = require("../tools/path-handler");
var HtmlHandler = /** @class */ (function () {
    function HtmlHandler() {
    }
    HtmlHandler.initialize = function (dir) {
        if (dir === void 0) { dir = ''; }
        file_handler_1.FileHandler.createDir(dir);
        file_handler_1.FileHandler.copy('html/index.html', path_handler_1.PathHandler.join(dir, 'index.html'), true);
        file_handler_1.FileHandler.create(path_handler_1.PathHandler.join(dir, '/index.css'));
    };
    HtmlHandler.createScriptFile = function (dir, fileEnding) {
        if (dir === void 0) { dir = ''; }
        if (fileEnding === void 0) { fileEnding = 'js'; }
        file_handler_1.FileHandler.create(path_handler_1.PathHandler.join(dir, "index." + fileEnding));
    };
    return HtmlHandler;
}());
exports.HtmlHandler = HtmlHandler;
