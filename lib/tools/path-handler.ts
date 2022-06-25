import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PathHandler {
    static fullPath = (dir: string, assets: boolean = false): string => {
        return assets ? path.join(__dirname, '../assets', dir) : path.join(process.cwd(), dir);
    };

    static join = (...dirs: string[]): string => {
        return path.join(...dirs);
    }
}
