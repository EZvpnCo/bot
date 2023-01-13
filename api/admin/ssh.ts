import { Config, NodeSSH } from 'node-ssh'
import { ClientChannel } from 'ssh2';


class EZssh {

    private client;
    private config;
    private shell: ClientChannel | null = null;

    constructor(config: Config) {
        this.config = config
        this.client = new NodeSSH()
    }

    public async connect() {
        await this.client.connect(this.config)
    }

    public isConnected() {
        return this.client.isConnected()
    }



    public async openShell(callback: (arg0: string) => void) {
        this.shell?.exit(1)
        this.shell = await this.client.requestShell()
        this.shell.on("data", (data: Buffer) => {
            callback(data.toString())
        })
        this.shell.stderr.on("data", (data: Buffer) => {
            callback("Error: " + data.toString())
        })
        return this
    }

    public async exitShell() {
        this.shell?.exit(1)
    }

    public async writeCommand(command: string) {
        if (!this.shell) return false
        this.shell.write(command + "\n")
    }
}


export default EZssh