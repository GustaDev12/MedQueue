import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { JobDTO } from "./job.dto";

@Injectable()
export class QueueProducer {
    constructor(
        @InjectQueue('service-queue') private serviceQueue: Queue
    ) { }

    async addJob(job: JobDTO) {
        return await this.serviceQueue.add('service', job, {
            priority: job.customer_priority === 'high' ? 1 : 2
        });
    }

}