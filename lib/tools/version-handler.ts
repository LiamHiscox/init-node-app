import {ScriptRunner} from "./script-runner";

class VersionHandler {
    static nodeVersion = (): string => ScriptRunner.runPipe('node --version').substring(1).trim();

    static parsedNodeVersion = (): number[] => VersionHandler.nodeVersion().split('.').map((v) => +v);
}

export default VersionHandler;
