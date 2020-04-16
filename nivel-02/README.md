# Introdução
Nível 02 do curso GoStack 11

# Comandos

## Primeiro projeto com Node.JS
- yarn init -y
- yarn add express
- yarn add typescript -D
- yarn tsc --init
- yarn tsc
- yarn add @types/express -D
- yarn add ts-node-dev -D
- yarn dev:server
- ts-node-dev --transpileOnly src/server.ts
- yarn add eslint -D
- yarn eslint --init
- yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest
- yarn add -D eslint-import-resolver-typescript
- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

- yarn add uuidv4
- yarn add date-fns
---Banco de dados
- yarn add typeorm pg
- yarn add reflect-metadata

### Configurações

No arquivo tsconfig.json alterar
  - "outDir": "./dist"
  - "rootDir": "./src"

- yarn eslint --init
  - Choose: To check syntax, find problems, and enforce code style
  - Choose: JavaScript modules (import/export)
  - Choose: None of these
  - Choose: Yes
  - Choose: with space do select and deslect (*) Node 
  - Choose: Use a popular style guide
  - Choose: Airbnb: https://github.com/airbnb/javascript
  - Choose: JSON
  - Choose: n
  - Copy: @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest
  - Remove: eslint@^5.16.0 || ^6.8.0
  - Do: yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest

### Ferramentas
- Plugin VS Code
  - editorconfig 
    - para gerar o arquivo, botão direito na raiz do projeto, "Generate .editorconfig"
    - ajustes no editorconfig
      - trim_trailing_whitespace = true
      - insert_final_newline = true
      - add end_of_line = lf
  - eslint
    - Apos o comando "yarn add -D eslint-import-resolver-typescript", Editar o arquivo .eslintrc.json
      - add: para resolver o problema do importe
        "settings": {
          "import/resolver": {
            "typescript": {}
          }
        }
      - add: para ignorar importação para o tipo ts
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            "ts": "never"
          }
        ]
  - prettier
    - after run "yarn add prettier eslint-config-prettier eslint-plugin-prettier -D"
      - edit .eslintrc.json
        - add in extends
          - "plugin:@typescript-eslint/recommended",
          - "prettier/@typescript-eslint",
          - "plugin:prettier/recommended"
        - add in rules
          - "prettier/prettier": "error"
    - create file "prettier.config.js"
    - create file ".eslintignore"


# Debug
- create a launch.json file in menu vscode "Run"
  - for Node.Js
  - add --inspect on run command like "ts-node-dev --inspect --transpileOnly --ignore-watch node_modules src/server.ts"
    - run project and play debug

```javascript
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "protocol": "inspector",
      "restart": true,
      "name": "Debug",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}\\index.js",
      "outFiles": [
        "${workspaceFolder}/**/*.js"
      ]
    }
  ]
}
```

# Coneceitos

## Models / Entidades / Modelo

## Repository
- Persistência <-> Repositório <-> Rota
- find, create

## SoC: Separation of Concerns (Separação de preocupações)
- Rota: receber a requisição, chamar outro arquivo, devolver um resposta.

## DTO: Data Transfer Object
- Transmitir dados de um arquivo para outro por meio de Objeto de preferencia

## Services

## SOLID
- S: Single Reponsability Principle
- D: Dependency Invertion Principle

## Dependency Inversion (SOLID)
- 

# Banco de dados

## Driver for node - SQL query builder
- [node-postgres](https://node-postgres.com/) - Postgres
- [Knex](http://knexjs.org/) - Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift

## ORM - Object Relational Mapping
- [Sequelize](https://sequelize.org/) - Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [TypeORM](https://typeorm.io/#/) - para typescript (supports MySQL / MariaDB / Postgres / CockroachDB / SQLite / Microsoft SQL Server / Oracle / SAP Hana / sql.js, supports MongoDB NoSQL database)
## IDE
- [dbeaver](https://dbeaver.io/)
- [Postbird](https://www.electronjs.org/apps/postbird)

# TypeORM
- yarn add typeorn 
- yarn add reflect-metadata
- Por padrão ja executa em javascript
  - deve configurar caso utilize typescript em package.json add no script;
    - "typeorm" : "ts-node-dev ./node_modules/typeorm/cli.js"
    - comandos;
      - yarn typeorm migration:create -n "nome da migration"
      - yarn typeorm migration:run
      - yarn typeorm migration:revert
      - yarn typeorm migration:show
- Em tsconfig.json descomentes as seguintes linhas
```
"experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
"emitDecoratorMetadata": true,         /* Enables experimental support for emitting type  metadata for decorators. */
"strictPropertyInitialization": false, /* Enable strict checking of property initialization in classes. */
```

# Docker
- Crição de ambientes isolados (container);
- Containers expõe portas para comunicação;

## Conceitos
- Imagem: Serviço disponível
- Container: Instancia da imagem
- Docker Registry (Docker Hub)
- Dockerfile
  - Receita de uma imagem;
 ```yaml
 # Partimos de uma imagem existente
 FROM node:10
 
 # Definimos as pasta e copiamos os arquivos
 WORKDIR /usr/app
 COPY . ./
 
 # Instalamos as dependências
 RUN yarn
 
 # Qual porta queremos export?
 EXPOSE 3333
 
 # Executamos nossa aplicação
 CMD yarn start
 ```
- Commands;
  
  - docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    
    - "-p": se a porta 5432 ja estiver sendo utilizda, podemos alterar a porta do postgres, exemplo (porta externa:porta interna do docker) "5433:5432";
    - "-d": ultima versão, com versão "-d postgres:12";
  - docker ps: exibe todos as instancias
    - "-a" : exibe todos os containers que ja esteve rodando
  - docker stop "CONTAINER ID" : deleta uma instancia no container

  - Show ports: Linux;
``` 
lsof -i :5432
sudo lsof -i -P -n | grep LISTEN
```
  - Show ports: Windows;
```
Get-Process -Id (Get-NetTCPConnection -LocalPort 5432).OwningProcess
```
