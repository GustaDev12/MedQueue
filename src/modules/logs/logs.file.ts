import { Injectable } from '@nestjs/common';
import fs, { existsSync } from 'fs'
import { join } from "path";

@Injectable()
export class FileLog {
    private log: fs.WriteStream;

    constructor() {
        const path = join(__dirname, "..", "../../logs", "atendimentos.csv")

        if (!existsSync(path)) {
            fs.writeFileSync(path, "ID,NOME,IDADE,EMAIL,PRIORIDADE,DATA,HORA,STATUS\n")
        }

        this.log = fs.createWriteStream(path, { flags: 'a' })
    }

    getLog () {
        return this.log
    }

    getPathLog () {
        return join(__dirname, "..", "../../logs", "atendimentos.csv")
    }
}
