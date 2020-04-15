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
