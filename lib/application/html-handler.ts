import {FileHandler} from "../tools/file-handler";
import {PathHandler} from "../tools/path-handler";

export class HtmlHandler {
    static initialize = (dir: string = '') => {
        FileHandler.createDir(dir);
        FileHandler.copy('html/index.html', PathHandler.join(dir, 'index.html'), true);
        FileHandler.create(PathHandler.join(dir, '/index.css'));
    };

    static createScriptFile = (dir: string = '', fileEnding = 'js') => {
        FileHandler.create(PathHandler.join(dir, `index.${fileEnding}`));
    }
}
