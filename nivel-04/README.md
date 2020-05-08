

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