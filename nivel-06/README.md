<p align="center">
  <h1 align="center">Nível 06</h1>
</p>

<p align="center">
  <h1 align="center">Deploy de aplicações Node.JS</h1>
  <p align="center">
    Com nossa aplicação pronta, podemos partir para sua publicação a fim disponibilizar nossa API em um endereço público acessível pelos apps front-end e mobile. Aqui também aprenderemos sobre integração contínua e deploy contínuo.
    <br />
  </p>
</p>

# Preparando para deploy

## Estratégias de deploy
- utilizando o [Digital Ocean](https://cloud.digitalocean.com/)

## Gerando build do projeto
- no projeto "iniciando-back-end"
- utilizando o babel para transpilação do codigo typescript
- @babel/preset-env: qual o nivel de transpiração quer fazer no seu codigo, especificar a versao do ecma por exemplo ou nao
- instalar as libs
```sh
yarn add @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver babel-plugin-transform-typescript-metadata @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```
- criar arquivo na raiz, *babel.config.js*

## Repositório no Github
- criar repositorio no github
- adicinar o link no remote do git
- comitar todo o codigo e enviar para o github

## Criando servidor Linux
- criar novo servidor no digital ocean
- Create Droplets (servidor)
- aba Marketplace
  - Selecionar Docker
- Choose a plan
  - Stater Basic
  - de $5
- Choose a datacenter region
  - New York ou San Francisco
- Authentication (preferencia para SSH Keys)
  - SSH keys
    - linux/mac : ssh-keygen
    - windows : https://docs.github.com/en/github/authenticating-to-github/checking-for-existing-ssh-keys
  - new SSH Key
    - copiar o conteudo da chave .pub
    - dar um nome qualquer
- Choose a hostname
  - informar o nome do projeto/aplicação
- Acessar o servidor via ssh
  - linux: ssh root@ip
  - windows: com "Git bash" ssh root@ip
    - via putty: 
      - usar PuttyGen
      - importar a chave criada
      - salvar novo ppk
      - no Putty SSH->auth->selecionar arquivo gerado
      
# Deploy da aplicação
## Configurando o servidor
- acessar o servidor
- atualizar os pacotes
  - rodar o comando `apt update` or `apt-get update`
- instalar os novos pacotes
  - rodar o comando `apt upgrade` or `apt-get upgrade`
- parar de usar o root 
- criar novo usuario
  - rodar o comando `adduser username`
  - dar permissão de sudo ao usuario `usermod -aG sudo username`
- acessar a home do usuario
  - criar pasta `mkdir .ssh`, para configurar a chave ssh
  - caso as permissões estiver para root `chown deploy:deploy .ssh`
  - copiar os arquivos ssh do root `cp ~/.ssh/authorized_keys /home/deploy/.ssh/`
  - trocar permissões `chown deploy:deploy authorized_keys`

- instalar o node no servidor
  - acessar o site do [nodejs](https://nodejs.org/en/)
  - [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)
    - Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora and Snap packages
      - [Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md)
        ```sh
          # Using Ubuntu
          curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
          sudo apt-get install -y nodejs
        ```
- instalar o yarn
- jeito errado 
  - `sudo apt install yarn`
  - removendo
    - `sudo apt purge yarn`
    - `sudo apt autoremove`
  - acessar [yarnpkg](https://classic.yarnpkg.com/lang/en/) classic, para o ubuntu
    - ```sh
      curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

      echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

      sudo apt update && sudo apt install --no-install-recommends yarn
      ```


## Clone da aplicação
- logar com o usuario criado
- **esses passos apenas serve para realizar um deploy inicial**
- acessar o servidor
- rodar o comando `ssh-keygen`, não precisa informar senha
- `cd ~/.ssh`
- `cat id_rsa.pub`
- copiar o retorno
- exemplo

```sh
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDdaaFHoxPxK/tRITtdscY58oYZA/QdkzYN7uXahV/8qY6bmlXPaOGTDrURsYgiNWTRzTnVsJUhklY8Oxjdrl1nOTEczCeyZ70QpjozEllM2HSjQTTMNgclciWQxhiqtqzilv/3oi0eOBio9508pBz/lYzb4ZJswEW+PSzSrSsoX2beXES81hDR/nF1fQrKGFQsVMFJFyilncEjQv0w6lTdY+jVDgX9k7Wa3tfpI3g5E9sCI5q/siw4c/GSeAyFq0UH3FydXP3L8T5HYJYT9sw05yKQk7G5KWHSuSqItuNAvRLSfV/KiFd1eVXQdNkW2B+sGw2iWzohymliLu+mlhcz deploy@node-deploy

```
- no github, acessar seu perfil -> Settings
- acessar **SSH and GPG keys**
- **New SSH key**, colar o retorno do .pub, dar um nome apropriado **Add SSH key**.
- clone seu repositorio com **ssh**
- exemplo: `git@github.com:danieldkm/node-deploy.git`
- criar uma pasta na home do seu usuario, ex: `mkdir app`
- acessar o projeto e rodar `yarn` para instalar as dependencias
- `yarn cache dir` apenas para mostrar onde fica o diretorio de cache do yarn, `yarn cache clean`
- `yarn build`, validar se gera o build


## Serviços do Docker

- boas praticas alterar a porta padrão externo do docker
- buscar algumas imagens no docker
- iremos instalar imagens da bitnami

### **[bitnami postgres](https://github.com/bitnami/bitnami-docker-postgresql)**
```sh
docker run -d --name postgresql -e POSTGRESQL_PASSWORD=209bac246f5384eec3a494eebe3070f1 -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=gobarber -p 35432:5432 bitnami/postgresql:latest

# lista os pods
docker ps
# para parar o pod
docker stop id
# para remover o pod
docker rm id
```
- se der problema com permissão do docker
- [docker post installation steps linux](https://docs.docker.com/engine/install/linux-postinstall/)
```sh
# Create the docker group.
sudo groupadd docker
# Add your user to the docker group.
sudo usermod -aG docker $USER
exit
logout
```

- modificar o arquivo ormconfig.json
```json

  {
    "type": "postgres",
    "host": "localhost",
    "port": 35432,
    "username": "postgres",
    "password": "209bac246f5384eec3a494eebe3070f1",
    "database": "gobarber",
    "entities": [
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "gobarber",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]

```

- rodar o comando para migrations
```sh
# em prod da erro
yarn typeorm migrate:latest
# agora em prod
./node_modules/.bin/typeorm migration:run
```
---
### **[bitnami mongo](https://github.com/bitnami/bitnami-docker-mongodb)**

```sh
docker run -d --name mongodb -e MONGODB_USERNAME=gobarber -e MONGODB_PASSWORD=b650c6162830b41f810255e70c9bc1d6 -e MONGODB_DATABASE=gobarber -p 47017:27017 bitnami/mongodb:latest
```


- modificar o arquivo ormconfig.json
```json
[
  {
    "type": "postgres",
    "host": "localhost",
    "port": 35432,
    "username": "postgres",
    "password": "209bac246f5384eec3a494eebe3070f1",
    "database": "gobarber",
    "entities": [
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 47017,
    "username": "gobarber",
    "password": "b650c6162830b41f810255e70c9bc1d6",
    "database": "gobarber",
    "useUnifiedTopology": true,
    "entities": [
      "./dist/modules/**/infra/typeorm/schemas/*.js"
    ]
  }
]
```

---

### **[bitnami redis](https://github.com/bitnami/bitnami-docker-redis)**

```sh
docker run -d --name redis -e REDIS_PASSWORD=aaf9bec5ce1e1bbadf78ee6c87b75a7c -p 56379:6379 bitnami/redis:latest
```

- adicionar arquivo .env a partir do .env.example
```sh
# Application
APP_SECRET=1da88c592dc7dd9d7bc2efdf1373f4b0
APP_API_URL=http://localhost:3333
APP_WEB_URL=http://localhost:3000

#Mail
MAIL_DRIVER=ethereal

# Storage
STORAGE_DRIVER=disk

# AWS Credentials
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Redis
REDIS_HOST=localhost
REDIS_PORT=56379
REDIS_PASS=aaf9bec5ce1e1bbadf78ee6c87b75a7c

```


