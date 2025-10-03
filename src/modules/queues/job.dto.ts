import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'
export class JobDTO {

    @IsNotEmpty({ message: 'O nome do paciente é obrigatório' })
    @IsString({ message: 'O nome do paciente deve ser uma string' })
    customer_name: string

    @IsEmail({}, { message: 'O email do paciente é inválido' })
    customer_email: string
    
    @IsEnum(['high', 'low'], { message: 'A prioridade do paciente deve ser high ou low' })
    customer_priority: 'high' | 'low'

    @IsInt({ message: 'A idade do paciente deve ser um número inteiro' })
    @Min(1, { message: 'A idade do paciente deve ser maior ou igual a 1' })
    @Max(120, { message: 'A idade do paciente deve ser menor ou igual a 120' })
    customer_age: number
}