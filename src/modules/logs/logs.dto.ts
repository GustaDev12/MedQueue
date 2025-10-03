import { JobDTO } from "../queus/job.dto"

export interface LogsDTO {
    id: string,
    nome: string,
    idade: number,
    prioridade: JobDTO["customer_priority"]
    email: string,
    data: string,
    hora: string,
    status: 'atendido'
}

export interface LogsCSVDTO {
    ID: string,
    NOME: string,
    IDADE: string,
    EMAIL: string,
    PRIORIDADE: LogsDTO["prioridade"],
    DATA: string,
    HORA: string,
    STATUS: string,
}