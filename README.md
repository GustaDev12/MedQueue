<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Service Queue API

## 📋 Descrição

Service Queue é uma API RESTful desenvolvida com NestJS para gerenciamento de filas de atendimento em ambientes clínicos ou hospitalares. O sistema permite adicionar pacientes à fila com diferentes níveis de prioridade, processar atendimentos de forma assíncrona e manter um registro detalhado de todos os atendimentos realizados.

## ✨ Funcionalidades Principais

- **Gerenciamento de Filas**: Adiciona pacientes à fila com prioridades diferentes (alta/baixa)
- **Processamento Assíncrono**: Utiliza BullMQ para processamento de atendimentos em background
- **Sistema de Prioridades**: Atende pacientes com prioridade alta antes dos demais
- **Registro de Logs**: Mantém histórico completo de todos os atendimentos em CSV
- **Funcionalidade de Desfazer**: Permite retornar o último paciente atendido para a fila

## 🚀 Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações server-side eficientes e escaláveis
- **BullMQ**: Biblioteca para implementação de filas de mensagens baseada em Redis
- **Redis**: Banco de dados em memória utilizado pelo BullMQ
- **TypeScript**: Linguagem de programação tipada que compila para JavaScript
- **Docker**: Containerização da aplicação e suas dependências

## 🛠️ Como Executar Localmente

### Pré-requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- npm ou yarn

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/service-queue.git
   cd service-queue
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o Redis com Docker:
   ```bash
   docker-compose up -d
   ```

4. Execute a aplicação:
   ```bash
   npm run start:dev
   ```

5. A API estará disponível em `http://localhost:3000`

## 📝 Exemplos de Uso da API

### Adicionar um Paciente à Fila

```bash
curl -X POST http://localhost:3000/queues/add-job \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "João Silva",
    "customer_email": "joao@exemplo.com",
    "customer_priority": "high",
    "customer_age": 45
  }'
```

### Consultar Pacientes Atendidos

```bash
curl -X GET http://localhost:3000/queues/peoples-served
```

### Desfazer Último Atendimento

```bash
curl -X GET http://localhost:3000/queues/undo
```

## 🏗️ Estrutura do Projeto

```
service-queue/
├── src/
│   ├── modules/
│   │   ├── queues/           # Módulo de gerenciamento de filas
│   │   │   ├── job.dto.ts
│   │   │   ├── queus.controller.ts
│   │   │   ├── queus.module.ts
│   │   │   ├── queus.processor.ts
│   │   │   ├── queus.producers.ts
│   │   │   └── queus.service.ts
│   │   │
│   │   └── logs/             # Módulo de registro de logs
│   │       ├── file.log.ts
│   │       ├── logs.dto.ts
│   │       ├── logs.service.ts
│   │       └── register.logs.ts
│   │
│   ├── app.module.ts         # Módulo principal da aplicação
│   └── main.ts               # Ponto de entrada da aplicação
│
├── logs/                     # Diretório para armazenamento de logs
│   └── atendimentos.csv
│
├── docker-compose.yml        # Configuração do Docker Compose
├── Dockerfile                # Configuração do Docker
└── package.json              # Dependências e scripts
```

## 🌟 Boas Práticas Adotadas

- **Arquitetura Modular**: Separação clara de responsabilidades entre módulos
- **Injeção de Dependências**: Utilização do sistema de DI do NestJS
- **Processamento Assíncrono**: Uso de filas para operações que podem ser executadas em background
- **Containerização**: Facilidade de implantação com Docker
- **Tipagem Forte**: Uso de TypeScript para maior segurança e manutenibilidade do código

---

Desenvolvido como projeto de estudo e portfólio por Gustavo Vinicius
