"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypescriptHandler = void 0;
var file_handler_1 = require("../tools/file-handler");
var path_handler_1 = require("../tools/path-handler");
var package_config_1 = require("../tools/package-config");
var ts_config_1 = require("../tools/ts-config");
var npm_handler_1 = require("./npm-handler");
var EXCLUSION_LIST = ["node_modules", "**/*.test.ts", "**/*.spec.ts"];
var TypescriptHandler = /** @class */ (function () {
    function TypescriptHandler() {
    }
    TypescriptHandler.initialize = function (dir, web) {
        if (dir === void 0) { dir = ''; }
        if (web === void 0) { web = false; }
        var configJSON = ts_config_1.TsConfig.getTsConfigJSON(web);
        var tsConfig = dir ? ts_config_1.TsConfig.setTsConfigOption(configJSON, {
            "include": [dir + "/**/*"],
            "exclude": EXCLUSION_LIST
        }) : ts_config_1.TsConfig.setTsConfigOption(configJSON, {
            "exclude": EXCLUSION_LIST
        });
        file_handler_1.FileHandler.writeJSON(ts_config_1.TsConfig.getTsConfigName(dir), tsConfig);
    };
    TypescriptHandler.addScripts = function (dir) {
        var _a;
        if (dir === void 0) { dir = ''; }
        var scripts = dir ? (_a = {},
            _a["build-" + dir + ":tsc"] = "tsc -p " + ts_config_1.TsConfig.getTsConfigName(dir),
            _a["watch-" + dir + ":tsc"] = "tsc -w -p " + ts_config_1.TsConfig.getTsConfigName(dir),
            _a) : {
            "build:tsc": "tsc",
            "watch:tsc": "tsc -w"
        };
        package_config_1.PackageConfig.addScripts(scripts);
    };
    TypescriptHandler.createIndexFile = function (dir) {
        if (dir === void 0) { dir = ''; }
        file_handler_1.FileHandler.create(path_handler_1.PathHandler.join(dir, 'index.ts'));
    };
    TypescriptHandler.install = function () {
        npm_handler_1.NpmHandler.installPackage('typescript');
        npm_handler_1.NpmHandler.installPackage('@types/node');
    };
    return TypescriptHandler;
}());
exports.TypescriptHandler = TypescriptHandler;
