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
  - acessar [yarnpkg](https://classic.yarnpkg.com/lang/en/) classic
    - ```sh
      curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

      echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

      sudo apt update && sudo apt install --no-install-recommends yarn
    ```