import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { QueueProducer } from "./queus.producers";
import { QueueProcessor } from "./queus.processor";
import { QueueService } from "./queus.service";
import { QueueController } from "./queus.controller";
import { LogsModule } from "../logs/logs.module";


@Module({
    imports: [
        BullModule.registerQueue({
            name: 'service-queue',
            defaultJobOptions:{
                attempts: 3,
                removeOnComplete:  true,
                backoff: {
                    type: 'exponential',
                    delay: 1000
                }
            }
        }),
        LogsModule
    ],
    controllers: [
        QueueController
    ],
    providers: [
        QueueProducer,
        QueueProcessor,
        QueueService,
    ]
})

export class QueusModule { }