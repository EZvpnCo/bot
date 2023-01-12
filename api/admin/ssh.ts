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


export const liveSSH = async (config: Config, command: string, parameters: string[], cwd: string | undefined) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ssh.connect(config)
            ssh.exec(command, parameters, {
                cwd,
                onStdout: (chunk) => {
                    console.log('stdoutChunk', chunk.toString('utf8'))
                },
                onStderr: (chunk) => {
                    console.log('stderrChunk', chunk.toString('utf8'))
                },
            })
        } catch (error) {
            resolve(false)
        }
    })
}