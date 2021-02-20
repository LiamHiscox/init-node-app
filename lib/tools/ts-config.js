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
exports.TsConfig = void 0;
var file_handler_1 = require("./file-handler");
var FILE_PATH_WEB = 'tsc/tsconfig.web.json';
var FILE_PATH_NODE = 'tsc/tsconfig.node.json';
var TsConfig = /** @class */ (function () {
    function TsConfig() {
    }
    TsConfig.getTsConfigName = function (project) {
        return project ? "tsconfig." + project + ".json" : 'tsconfig.json';
    };
    TsConfig.getTsConfigJSON = function (web) {
        if (web === void 0) { web = false; }
        return file_handler_1.FileHandler.readJSON(web ? FILE_PATH_WEB : FILE_PATH_NODE, true);
    };
    TsConfig.setTsConfigOption = function (tsConfigJSON, tsConfig) { return (__assign(__assign({}, tsConfigJSON), tsConfig)); };
    TsConfig.setCompilerOptions = function (tsConfigJSON, tsConfig) { return (__assign(__assign({}, tsConfigJSON), { compilerOptions: __assign(__assign({}, tsConfigJSON.compilerOptions), tsConfig) })); };
    return TsConfig;
}());
exports.TsConfig = TsConfig;
