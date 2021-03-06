<p align="center">
  <h1 align="center">Nível 04</h1>
</p>

<p align="center">
  <h1 align="center">Arquitetura e testes no Node.js</h1>
  <p align="center">
    Nessa etapa, continuaremos o projeto iniciado anteriormente adicionando pontos cruciais de arquitetura, design patterns e testes automatizados. 
    <br />
  </p>
</p>

# Arquitetura e DDD

## Conceitos DDD e TDD

### Domínio: 
- Qual a área de conhecimento daquele módulo/arquivo

### Metodologias de desenvolvimento
- DDD - Domain Driven Design (Back-end)
- TDD - Test Driven Development (Back-end / Front-end)
   - Criar testes antes de criar a funcionalidade.

## Separando em módulos
- Separar/isolar responsabilidade
- melhorar a estrutura de pastas
- melhorar o dominio


## Camada de Infra
- DDD - separar a regra de negocio, a area de negocio e o dominio, da camada de infra
- Infra: sao ferramentas que escolhemos para relacionar com a camada de dominio
  - para o dono de um produto nao faz diferenca que tipo de ferramente voce esta usando.
  - se vai usar nodejs ou java ou qualquer outra linguagem
  - que tipo de ferramenta usar para envio de email e etc
- dominio: onde fica as regra de negocio
  - nao sabe o que esta sendo utilizado na "infra"
- nao interessa as ferramenta que tu esta utilizando para enviar email, para salvar os dados, etc, desde que a camada de dominio nao tenha conhecimento dessas ferramentas

### Configurações
- separando o que é dominio de negocio
- estruturando as pastas para separar a regra de negocio.

```javascript
{
  shared: {
    descricao: "compartilha dados entre todos os modulos",
    errors: "erros da aplicação",
    infra: {
      descricao: "ferramenta a serem utilizadas ('typeorm', 'sequelize', 'nodemail', etc)",
      databases: {
        descricao: "typeorm ou qualquer outro",
        entities: "entidades, modelos, coleções da base de dados"
      },
      http: {
        descricao: "tudo que relaciona com http, express por exemplo",
        middlewares: "intermediario (interceptors) para as rotas",
        routes: "rotas do dominio"
      }
    },
  },
  modules: {
    descricao: "onde ficam os dominios e/ou infra",
    infra...,

  },

}
```
## Configurando Imports

### Configurando o caminho "path" em tsconfig
```json
"baseUrl": "./src"
//caminhos da minha aplicação ou atalhos
"paths": {
  "@modules/*": ["modules/*"],
  "@config/*": ["config/*"],
  "@shared/*": ["shared/*"]
}
```
- como estamos utilizando typescript, será necessário instalar uma lib 
```sh
yarn add tsconfig-paths -D
```
- e atualizar o script de execução de - para
  - "-r": register
  - "tsconfig-paths/register": executa a lib para setar os caminhos da aplicação
  - **adicionar em todos os scripts da aplicação**
```json
"scripts": {
  "dev:server:sempath": "ts-node-dev --inspect --transpileOnly --ignore-watch node_modules src/shared/infra/http/server.ts",
  "dev:server": "ts-node-dev -r tsconfig-paths/register --inspect --transpileOnly --ignore-watch node_modules src/shared/infra/http/server.ts",
  "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
}
```

## Liskov Substitution Principle ou Princípio de Substituição de Liskov (S O **L** I D)
- A substituibilidade é um princípio na programação orientada a objetos que declara que, em um programa de computador, se S é um subtipo de T, os objetos do tipo T podem ser substituídos por objetos do tipo S sem alterar nenhuma das propriedades desejáveis ​​do programa.
- a partir daqui criamos um arquivo com acronimo I...que é desigada para **Interfaces**
- adicionar regra no eslint para esses arquivos de interfaces
```json
"rules": {
  "@typescrupt-eslint/interface-name-prefix": ["error", { "prefixWithI": "always"}]
}
```

## Reescrevendo Repositórios
- ter controle dos metodos do nosso repositorio
- dtos: data transfer objects
  - sempre que precisar tipar uma informação composta para criar, deletar, listar, atualizar, etc, que pode se repetir, cria se o dto
  - quais dados é necessário para criação de uma entidade

## Dependency Inversion Principle (S O L I **D**)
- Inversão de dependencia
- Ao invez do service precisar saber qual o formato do repositorio, fazendo com que a classe que precise do repositorio informar qual quer
- desabilitar a regra "no-useless" no eslint
```json
"rules" {
  "no-useless-constructor": "off",
}
```
## Refatorando módulo de usuários
- ajuste no ormconfig, pois mudou o arquivos de diretorio

## Injeção de dependências

```sh
yarn add tsyringe
```
- tsyringe
  - register: instancia toda vez que é chamado
  - registerSingleton: instancia uma unica vez
- termo "container" nesse caso é ele que controla a injestão das dependencias, nas services

## Usando controllers
- o controller deve ter no maximo 5 metodos
  - index, show, create, update, delete




# Testes e TDD

## Testes
- testes automatizados
- Que a nossa aplicação continue funcionando independente do número de novas funcionalidades e do número de devs no time.
  
***1. Testes unitários***

- Testam funcionalidades específicas da nossa aplicação (precisam ser funções puras).
- JAMAIS: Chamada à uma API, efeito colateral (envio de email, serviços externos).
  
***2. Testes de integração***

- Testam uma funcionalidade completa, passando por várias camadas da aplicação.

- Exemplo: chamada da Route -> Controller -> Serviço -> Repositório -> ...
- Reliza o teste completo em um so teste

***1. Testes E2E***

- Testes que simulam a ação do usuário dentro da nossa aplicação.
- Front-end
- Exemplo:
1. Clique no input de email
2. Preencha teste@teste.com.br
3. Clique no input de senha
4. Preencha 123456
5. Clique no botão "Logar"
6. Espero que a página tenha enviado o usuário para o dashboard

## TDD (Test Driven Development)
- Desenvolvimento dirigito a testes
- Cria os testes antes de criar as funcionalidades na aplicação
- Exemplos:
  - Quando ele se cadastrar na aplicação, ele deve receber um email de boas-vindas;

## Configurando Jest
```sh
yarn add jest -D
```
```sh
yarn jest --init
```
```sh
yarn run v1.22.4
$ C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-04\iniciando-back-end\node_modules\.bin\jest --init

The following questions will help Jest to create a suitable configuration for your project

√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... no
√ Automatically clear mock calls and instances between every test? ... yes

✏️  Modified C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-04\iniciando-back-end\package.json

�📝  Configuration file created at C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-04\iniciando-back-end\jest.config.js
Done in 33.22s.
```
- Em jest.config.js, descomentar e alterar as linhas
```javascript
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  preset: 'ts-jest',
  testMatch: [
    "**/*.spec.ts",
  ],
}
```

```sh
yarn add @types/jest -D
```
- no arquivo do .eslintrc.json, adicionar o jest para o lint saber que o jest tem variaveis globais.

```json
"env": {
  "jest": true
}
```
- <span style="color: red">Caso ocorrer erros no config do jest como, o erro ocorreu quando adicionei no preset: 'ts-jest'
</span>


```sh
Validation Error:


  The "id" argument must be of type string. Received type object
  TypeError [ERR_INVALID_ARG_TYPE]: The "id" argument must be of type string. Received type object
```
  - instale
```sh
yarn add ts-jest -D
```

- se tiver com erro no testes mesmo apos ter corrigido os testes, no jest tem um comando para limpar o cache dele
```sh
yarn jest --clearCache
```
## Pensando nos testes

## Criando o primeiro teste
- criar repositorios fakes

## Coverage report
- ferramenta de cobertura de testes

- Em jest.config.js, descomentar e alterar as linhas
```javascript
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: "coverage",
  coverageReporters: [
    "text-summary",
    "lcov",
  ],
}
```

## Testando criação de usuário
## Testando autenticação
## Testes de autenticação
## Provider de storage
- tipos de CDN (Content Delivery Network)
  - Amazon S3
  - Google Cloud Storage
  - Digital Ocean Spaces
  - Azure Storage Account
## Atualização de Avatar
- jest 
  - spy - espionar se alguma função da aplicação foi disparada.
<br>
<br>
<hr>

<p align="center">
  <h1 align="center">Continuando back-end do app</h1>
  <p align="center">
    Durante esse módulo iremos aprender conceitos mais complexos do back-end da aplicação como relacionamentos complexos, trabalhos em segundo plano, cache, bancos de dados não-relacionais e segurança.
    <br />
  </p>
</p>

# Estrutura e Ajustes

## Mapeando features do sistema

### [Mapeamento de requisitos](./iniciando-back-end/README.md)
- RF: Requisitos funcionais
  - quais são as funcionalidades
  - usuário vai poder fazer algo (recuperar senha por exemplo)
- RNF: Requisitos não funcionais
  - Coisas que não são ligadas com a regras de negocios da aplicação
  - quais libs, frameworks, tecnologias, database, etc
- RN: Regra de negocios
  - sempre tem que estar atrelada ao RF ou RNF se não esta errado.

# Perfil do usuário

## Aplicando TDD na prática

- Criar a service primeiro bem simples quase vazio
- é interessante deixar criado a servise para realizar os testes
- Executar um arquivo especifico para teste
```sh
yarn test src/modules/users/services/SendForgotPasswordEmailService.spec.ts
```
- Primeiro o teste deve falhar, depois fazer passar e refatorar.
  - RED
  - GREEN
  - REFACTOR

## Recuperação de senha
- para resetar a senha
  - Identificar o usuário, enviando um token para validar o reset de senha.

## Reset de senha
```sh
 yarn test src/modules/users/services/ResetPasswordService.spec.ts 
```

## Finalizando testes
- Mock: alem de espcionar consegue substituir o retorno, resposta, funcao etc
  - mockImplementation: quando algum codigo executar a funcao, irá executar sua funcao no teste
  - mockImplementationOnce: mesma coisa de cima mas irá mockar apenas uma vez no seu teste

## Salvando tokens no banco
- Criação
1. Rotas e controllers
2. Repositório de tokens (TypeORM)
3. Criar migrations de token
```sh
yarn typeorm migration:create -n CreateUserTokens
```
4. Provider de envio de e-mail (DEV)
5. registrar providers no container
6. Testar tudo

## Emails em desenvolvimento
4. Provider de envio de e-mail (DEV)
- usando [nodemailer](https://nodemailer.com/) com [ethereal](https://ethereal.email/) em ambiente de dev
  - dependecials
```sh
yarn add nodemailer
yarn add @types/nodemailer -D
```

## Template de emails
- Criação de um novo provider para a criação de template
- buscar por "node template engine"
  - exemplos
  - [exepress](https://expressjs.com/en/resources/template-engines.html)
  - [handlebarsjs](https://handlebarsjs.com/)
  - [nunjucks](https://mozilla.github.io/nunjucks/)
- iremos usar o handlebars
```sh
yarn add handlebars
```

## Template engine
- criação do arquivo de template na pasta views no users
- foi utilizado o handlebars para o template

## Refatoração dos testes
- foi padronizado as chamadas dos providers e services em no beforeEach

## Atualização do perfil
- aplicando TDD

## Rota e controller de perfil
- sempre que houver uma funcionalidade nova, iremos criar uma service


# Agendamento
- resolver as funcionalidades parte de agendamento
- rotas, serviços, testes, controllers, modelos, tabelas, etc

## Listagem de prestadores
## Filtrando agendamentos por mês
## Listando horários disponíveis
## Criação do agendamento
- nova migration
```sh
yarn typeorm migration:create -n AddUserIdToAppointments
#after modify file migration
yarn typeorm migration:run
```
- se tiver com erro no testes mesmo apos ter corrigido os testes, no jest tem um comando para limpar o cache dele
```sh
yarn jest --clearCache
```

## Rotas e controllers
<br>
<br>
<hr>

<p align="center">
  <h1 align="center">Finalizando back-end do app</h1>
  <p align="center">
    Nesse módulo finalizaremos nosso back-end incluindo as últimas funcionalidades do app e também aprendendo conceitos como MongoDB, variáveis ambiente, validação, cache, segurança, etc.
    <br />
  </p>
</p>

# Prestador de serviços

## Agenda do prestador

## Configurando MongoDB
Banco relacional temos controle sobre a 
estrutura da tabela, versão, etc

- **MongoDB**: Larga escala de dados, muitos dados entrando, saindo e pouco relacionamento
  - ORMs;
    - mongoose
    - typeorm
  - docker

```sh
docker run --name mongodb -p 27017:27017 -d -t mongo
# if image exists
docker start mongodb
# string connectino on IDE
mongodb://localhost:27017
```
```sh
yarn add mongodb
yarn add @types/mongodb -D
```

## Estrutura de notificações
## Enviando notificações
## Refatorando testes

# Personalizando para produção

## Validando dados

- lib de validação "[celebrate](https://github.com/arb/celebrate)"
```sh
yarn add celebrate
yarn add -D @types/hapi__joi
```

## Variáveis ambiente
- são informações que queremos na aplicação, tenham valores diferentes, baseado no ambiente que nossa aplicação esta rodando.
  - quando estmos em ambiente de desenvolvimento o banco é diferente do ambiente de produção
- libs
```sh
yarn add dotenv
```
- remover arquivo do controle de versão
```sh
git rm --cached ormconfig.json
```

## Utilizando Class Transformer
- ferramenta 
- para controlar oque quer mostrar para o front 
```sh
yarn add class-transformer
```

## Emails pelo Amazon SES
- [Amazon SES](https://aws.amazon.com/pt/ses/)
- mais barato que outros serviços
- outros exemplos
  - [sparkpost](https://www.sparkpost.com/)
  - [mailgun](https://www.mailgun.com/)
  - [mailchimp](https://mailchimp.com/)
- comprar dominios 
  - [Domains Google](https://domains.google/intl/pt-BR/)

- Caso for enviar muitos e-mail tente não usar via smtp, use o **batch**, via api da aws

- ses com [nodemailer](https://nodemailer.com/transports/ses/)

```sh
yarn add aws-sdk
```
- [Environment Variables To Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)
- [Using Credentials from Environment Variables](https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials_environment.html)
  - serviço iam
    - criar novo usuário: app-gobarber
    - adicionar a regra fullaccess do ses
    - anotar as credenciais

## Organizando o container

## Upload de arquivos para o Amazon S3
- CDN (Content Delivery Network)
- servidor otimizado para performance
- escala vertial: aumenta os recursos
- escala horizontal: cria um novo servidor (distribuição de carga)
- lib mime, to show image on the brownser with s3
```sh
yarn add mime
```

# Cache e segurança

## Configurando cache
- [elasticsearch](https://www.elastic.co/pt/elasticsearch/)
- [elasticache](https://aws.amazon.com/pt/elasticache/)
- [Redis](https://redis.io/)
  - não tem tabelas
  - trabalha com chave e valor
  - docker
```sh
docker run --name redis -p 6379:6379 -d -t redis:alpine
```
  - driver/lib
    - [ioredis](https://github.com/luin/ioredis)
```sh
yarn add ioredis
yarn add -D @types/ioredis
```
- Redis Gui / ide?
  - [redily](https://www.electronjs.org/apps/redily)

## Cache lista de providers
## Invalidando cache
## Cache de agendamentos
- monitoramento de requisições
  - [datadoghq](https://www.datadoghq.com/)
## Refatorando testes
## Express rate limit
- brute force: tenta realizar varias requisições, tenta derrubar, etc
- lib: [node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible#readme)
```sh
yarn add rate-limiter-flexible
yarn add redis
yarn add -D @types/redis
```