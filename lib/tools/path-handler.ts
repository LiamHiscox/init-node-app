const path = require('path');

export class PathHandler {
    static fullPath = (dir: string, assets: boolean = false): string => {
        return assets ? path.join(__dirname, '../assets', dir) : path.join(process.cwd(), dir);
    };

    static join = (...dirs: string[]): string => {
        return path.join(...dirs);
    }
}
