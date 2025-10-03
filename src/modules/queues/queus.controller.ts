import { Body, Controller, Get, Post } from "@nestjs/common";
import { QueueService } from "./queus.service";
import { JobDTO } from "./job.dto";


@Controller("queue")
export class QueueController {
    constructor(
        private readonly queueService: QueueService,
    ) { }

    @Post("add-patient")
    addJob(@Body() data: JobDTO) {
        return this.queueService.addJob(data);
    }


    @Post("add-last-patient")
    addLastPatientInQueue() {
        return this.queueService.addLastPatientInQueue();
    }

}