import { Injectable } from "@nestjs/common";
import { LogsDTO } from "./logs.dto";
import { FileLog } from "./logs.file";
import fs from 'fs'

@Injectable()
export class RegisterLogs {
    private log: fs.WriteStream;

    constructor(
        private readonly FileLog: FileLog
    ) {
        this.log = this.FileLog.getLog()
    }

    private async WriteLogs(data: LogsDTO) {
        const dataToWrite = `${data.id},${data.nome},${data.idade},${data.email},${data.prioridade},${new Date().toLocaleDateString()},${new Date().toLocaleTimeString()},${data.status}\n`
        this.log.write(dataToWrite)
    }


    async registerLogs(data: LogsDTO) {
        if (this.log.writable) {
            this.WriteLogs(data)
        } else {
            this.log.on('drain', () => this.WriteLogs(data))
        }
    }

}
