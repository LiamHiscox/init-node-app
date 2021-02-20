import {PathHandler} from "./path-handler";
const fs = require('fs');


export class FileHandler {
    static readJSON = (path: string, assets: boolean = false): any => {
        return JSON.parse(FileHandler.read(path, assets));
    };

    static read = (dir: string, assets: boolean = false): string => {
        return fs.readFileSync(PathHandler.fullPath(dir, assets)).toString();
    };

    static writeJSON = (dir: string = '', content: any): void => {
        FileHandler.write(dir, JSON.stringify(content, null, 2));
    };

    static write = (dir: string, content: any): void => {
        fs.writeFileSync(PathHandler.fullPath(dir), content);
    };

    static find = (dir: string): boolean => {
        return fs.existsSync(PathHandler.fullPath(dir));
    };

    static create = (dir: string): void => {
        fs. appendFileSync(PathHandler.fullPath(dir), '');
    };

    static createDir = (dir: string): void => {
        !FileHandler.find(dir) ? fs.mkdirSync(PathHandler.fullPath(dir)) : null;
    };

    static copy = (from: string, to: string, fromAssets: boolean = false): void => {
        fs.copyFileSync(
            PathHandler.fullPath(from, fromAssets),
            PathHandler.fullPath(to));
    };
}
