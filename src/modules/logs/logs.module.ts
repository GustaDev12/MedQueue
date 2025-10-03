import { Module } from "@nestjs/common";
import { LogsController } from "./logs.controller";
import { RegisterLogs } from "../logs/logs.register";
import { FileLog } from "../logs/logs.file";
import { LogsService } from "../logs/logs.service";

@Module({
    controllers: [
        LogsController
    ],
    providers: [
        RegisterLogs,
        LogsService,
        FileLog,
    ],
    imports: [],
    exports: [
        RegisterLogs,
        LogsService
    ]
})

export class LogsModule { }