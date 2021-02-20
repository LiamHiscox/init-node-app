"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerHandler = void 0;
var file_handler_1 = require("../tools/file-handler");
var DockerHandler = /** @class */ (function () {
    function DockerHandler() {
    }
    DockerHandler.initialize = function () {
        file_handler_1.FileHandler.copy('docker-compose.yaml', 'docker-compose.yaml', true);
    };
    return DockerHandler;
}());
exports.DockerHandler = DockerHandler;
