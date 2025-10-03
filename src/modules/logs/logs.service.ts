
import { Injectable } from "@nestjs/common";
import { FileLog } from "./logs.file";
import csv from 'csv-parser';
import fs from 'fs'
import { LogsCSVDTO } from "./logs.dto";


@Injectable()
export class LogsService {
    constructor(
        private readonly fileLog: FileLog
    ) { }

    async getSystemLogs() {
        const results: LogsCSVDTO[] = []
        const path = this.fileLog.getPathLog();
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data: LogsCSVDTO) => {
                results.push(data)
            })
            .on('end', () => {
                resolve(results)
            })
        })
    }

    async getLastLog(): Promise<LogsCSVDTO | undefined> {
        const results: LogsCSVDTO[] = []
        const path = this.fileLog.getPathLog();
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv())
                .on('data', (data: LogsCSVDTO) => {
                    results.push(data)
                })
                .on('end', () => {
                    const latest = results.pop();
                    resolve(latest)
                })
        })
    }
}