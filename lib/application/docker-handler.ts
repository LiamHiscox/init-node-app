import {FileHandler} from "../tools/file-handler";

export class DockerHandler {
    static initialize = () => {
        FileHandler.copy('docker-compose.yaml', 'docker-compose.yaml', true);
    };
}
