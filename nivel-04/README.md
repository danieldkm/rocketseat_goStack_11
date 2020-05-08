

<p align="center">
  <h1 align="center">Arquitetura e testes no Node.js</h1>
  <p align="center">
    <strong>Treinamento imersivo:</strong> Nível 04 do curso GoStack 11
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
module.exports = {
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
- Caso ocorrer erros no config do jest como, o erro ocorreu quando adicionei no preset: 'ts-jest'
```sh
Validation Error:


  The "id" argument must be of type string. Received type object
  TypeError [ERR_INVALID_ARG_TYPE]: The "id" argument must be of type string. Received type object
```
  - instale
```sh
yarn add ts-jest -D
```