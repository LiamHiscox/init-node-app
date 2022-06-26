import {fileURLToPath} from "url";
import path from "path";

export const dirname = (metaUrl: string) => {
    const filename = fileURLToPath(metaUrl);
    return path.dirname(filename);
}
