import { Injectable } from "@nestjs/common";
import { QueueProducer } from "./queus.producers";
import { LogsService } from "../logs/logs.service";
import { JobDTO } from "./job.dto";

@Injectable()
export class QueueService {

    constructor(
        private readonly queueProducer: QueueProducer,
        private readonly logsService: LogsService
    ) { }

    async addJob(data: JobDTO) {
        const addJob = await this.queueProducer.addJob(data)
        return {
            messagem: "Paciente adicionado à fila de atendimento.",
            job_id: addJob.id,
        }
    }

    async addLastPatientInQueue() {
        const data = await this.logsService.getLastLog()
        if (data) {
            this.addJob({
                customer_age: Number(data.IDADE),
                customer_email: data.EMAIL,
                customer_name: data.NOME,
                customer_priority: data.PRIORIDADE
            })
        }
        return {
            message: "O último paciente atendido foi incluído novamente na fila de atendimento.",
            statusCode: 202,
        }
    }

}