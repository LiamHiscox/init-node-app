"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathHandler = void 0;
var path = require('path');
var PathHandler = /** @class */ (function () {
    function PathHandler() {
    }
    PathHandler.fullPath = function (dir, assets) {
        if (assets === void 0) { assets = false; }
        return assets ? path.join(__dirname, '../assets', dir) : path.join(process.cwd(), dir);
    };
    PathHandler.join = function () {
        var dirs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dirs[_i] = arguments[_i];
        }
        return path.join.apply(path, dirs);
    };
    return PathHandler;
}());
exports.PathHandler = PathHandler;
