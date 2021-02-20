"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageConfig = void 0;
var file_handler_1 = require("./file-handler");
var FILE_NAME = 'package.json';
var PackageConfig = /** @class */ (function () {
    function PackageConfig() {
    }
    PackageConfig.getPackageJSON = function () {
        return file_handler_1.FileHandler.find(FILE_NAME) ?
            file_handler_1.FileHandler.readJSON(FILE_NAME) :
            null;
    };
    PackageConfig.addScripts = function (scripts) {
        var packageJson = PackageConfig.getPackageJSON();
        if (packageJson) {
            var newPackageJson = __assign(__assign({}, packageJson), { scripts: __assign(__assign({}, packageJson.scripts), scripts) });
            file_handler_1.FileHandler.writeJSON(FILE_NAME, newPackageJson);
        }
        else {
            console.log("No package.json file found to add script");
        }
    };
    return PackageConfig;
}());
exports.PackageConfig = PackageConfig;
