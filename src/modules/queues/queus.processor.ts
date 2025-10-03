import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { JobDTO } from "./job.dto";
import { RegisterLogs } from "../logs/logs.register";

@Processor('service-queue')
export class QueueProcessor extends WorkerHost {
    constructor(
        private readonly registerLogs: RegisterLogs
    ) { super() }

    private async waitDelay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    async process(job: Job<JobDTO>): Promise<any> {
        await this.waitDelay(1000)
        console.log(`[QueueProcessor] Analisando sintomas do paciente: ${job.data.customer_name} (Job ID: ${job.id})`);
        await this.waitDelay(5000)
        console.log(`[QueueProcessor] Prescrevendo medicamentos para o paciente: ${job.data.customer_name} (Job ID: ${job.id})`);
        await this.waitDelay(1000)
        return true
    }

    @OnWorkerEvent('completed')
    onCompleted(job: Job<JobDTO>, result: any) {
        this.registerLogs.registerLogs({ nome: job.data.customer_name, idade: job.data.customer_age, prioridade: job.data.customer_priority, email: job.data.customer_email, id: job.id as string, status: 'atendido', data: new Date().toLocaleDateString(), hora: new Date().toLocaleTimeString() })
        console.log(`[QueueProcessor] Atendimento concluído para o paciente: ${job.data.customer_name} (Job ID: ${job.id})`);
    }

    @OnWorkerEvent('active')
    onActive(job: Job<JobDTO>) {
        console.log(`[QueueProcessor] 🚀 Atendimento iniciado - Job ID: ${job.id}, Paciente: ${job.data.customer_name}`);
    }

}