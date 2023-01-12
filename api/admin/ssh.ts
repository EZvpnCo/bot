import { Config, NodeSSH } from 'node-ssh'

const ssh = new NodeSSH()

export const checkConnection = async (config: Config) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ssh.connect(config)
            resolve(true)
        } catch (error) {
            resolve(false)
        }
    })
}


export const liveSSH = async (config: Config, command: string, callback: { (result: any): void; (arg0: string): void }) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ssh.connect(config)
            ssh.execCommand(command, {
                cwd: '',
                onStdout: (chunk) => {
                    try {
                        callback('StdOut:\n' + chunk.toString('utf8'))
                    } catch (error) {
                        callback('StdOut:\n' + '~')
                    }
                },
                onStderr: (chunk) => {
                    try {
                        callback('StdErr:\n' + chunk.toString('utf8'))
                    } catch (error) {
                        callback('StdErr:\n' + '~')
                    }
                },
            })
            resolve(true)
        } catch (error) {
            resolve(false)
        }
    })
}