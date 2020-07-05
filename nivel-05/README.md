<p align="center">
  <h1 align="center">Nível 05</h1>
</p>

<p align="center">
  <h1 align="center">Finalizando front-end web do app</h1>
  <p align="center">
    Nessa etapa continuaremos o desenvolvimento do front-end web da aplicação GoBarber criando as telas e funções que os prestadores de serviço utilizarão para consultar sua agenda e disponibilidade.
    <br />
  </p>
</p>

# Ajustes na API

## Introdução
- link [figma](https://www.figma.com/file/8VsqsD30wcdPCeM7LqjUxe/GoBarber-(Copy))

## Utilizando Query Params
## Agendamentos no mesmo horário
## Dias indisponíveis no mês
## Clientes dos agendamentos

- **eager**: sempre irá trazer o usuário
- **lazy**: carrega o usuario quando utiliza por exemplo "const user = await appointment.user"
- **eager loading**: 10 (user_id, user_id) mantem uma query para trazer os usuarios
 
## Serialização no cache

# Recuperação de senha

## Criando página de recuperação

## Enviando formulário a API

## Criando página de redefinição
- Confirmação de senha
  - https://til.hashrocket.com/posts/vahuw4phan-check-the-password-confirmation-with-yup

## Implementando redefinição
- obter query param da url/pagina/site
```javascript
import {  useHistory, useLocation } from 'react-router-dom';
const location = useLocation();
const token = location.search.replace('?token=', '');
```
# Dashboard

## Criando Header
## Próximo agendamento
## Listagem de agendamentos
## Calendário e estilizações
- lib para montar calendario
```sh
yarn add react-day-picker
```

## Disponibilidade do mês
## Agendamentos da API
## Exibindo agendamentos em tela
## Finalizando listagem de agendamentos

# Perfil do usuário

## Página de perfil
## Troca de avatar
## Alteração dos dados



<p align="center">
  <h1 align="center">Finalizando front-end mobile do app</h1>
  <p align="center">
    Durante essas aulas, continuaremos o aplicativo mobile com React Native do GoBarber que será utilizado pelos clientes para agendar serviços com os prestadores.
    <br />
  </p>
</p>

# Ajustes na API
## Introdução ao módulo
## Lista de providers com serialização
```sh
# com o emulador aberto ou dispositivo conectado
# para poder rodar a api como localhost
adb reverse tcp:3333 tcp:3333
```
## Endereço das imagens
## Criando páginas e rotas

# Dashboard
## Header do Dashboard
## Buscando providers da API
## Listagem de prestadores

# Agendamento
## Estrutura de criação
## Alternando entre providers
## Criando Picker de data
- lib para montar o calendario
- [datetimepicker](https://github.com/react-native-community/datetimepicker)
```sh
yarn add @react-native-community/datetimepicker
```
## Buscando disponibilidade da API
## Debugando app com Flipper
- [Facebook Flipper](https://fbflipper.com/)
- para encontrar um componente mais facil
```javascript
Header.displayName = 'DashboardHeader';
```
## Disponibilidade por período
## Mostrando horários em tela
## Criação do agendamento

# Sucesso
## Criando estrutura da tela
## Formatando a data

# Perfil
## Criando tela de perfil
## Atualização dos dados
## Atualização do avatar
- lib para abir camera, buscar imagem do algum etc
- [Image picker](https://github.com/react-native-community/react-native-image-picker)
```sh
yarn add react-native-image-picker
```
- lib para manipular a imagem 
- [Image editor](https://github.com/react-native-community/react-native-image-editor)


<p align="center">
  <h1 align="center">Testes no ReactJS</h1>
  <p align="center">
    Nesse módulo, conheceremos as principais ferramentas do ecossistema do React para testar nossas aplicações a fim de garantir que o usuário tenha a mesma experiência com a parte visual da aplicação independente de quantas funcionalidades sejam adicionadas.
    <br />
  </p>
</p>

# Ambiente de testes

## Configurando ambiente do Jest

- end to end
- nem sempre é fazer TDD
- o que deve ser testado
  - testar arquivos que possam conter regras de negocio.

- libs
  - [testing library react](https://testing-library.com/docs/react-testing-library/intro)
    - ja vem instalado no reactjs por padrao no scafolds.
  - [react hooks testing library](https://react-hooks-testing-library.com/)
  - [react native testing library](https://github.com/callstack/react-native-testing-library)

## Criando primeiro teste do zero
- adicionar no `env` do eslint.json `"jest": true`
- jest.mock -> substitui qualquer import
- jest.fn() -> função qualquer.
- React.ReactNode -> qualquer conteudo que um componente react poderia receber.

## Gerando coverage report
- adicionar configuração do coverage no `package.json`
```json
"jest": {
  "collectCoverageFrom": [
    "src/pages/**/*.tsx",
    "src/components/**/*.tsx",
    "src/hooks/*.tsx",
    "!src/hooks/index.tsx"
  ]
}
```
- `yarn test --coverage --watchAll false`
  - `--coverage` : gera relatorio de cobertura
  - `--watchAll` : nao ficar observando qualquer alteracao

# Testando autenticação
## Teste de login
- fireEvent : simular um evento/interação que o usuário teria com a tela.

## Mock do hook de autenticação
## Finalizando testes no login

# Testando hooks
## Iniciando testes dos hooks
```sh
yarn add @testing-library/react-hooks -D
yarn add react-test-renderer -D
```

## Criando mock da API
```sh
yarn add axios-mock-adapter -D
```

## Finalizando testes do hook

# Testes no React Native
## Configurando ambiente
- lib [React Native Testing Library](https://github.com/callstack/react-native-testing-library)
```sh
yarn add --dev react-native-testing-library
# Additional Jest matchers
yarn add --dev @testing-library/jest-native
```

- dentro do package.json adicionar o codigo, onde ficar o config do jest
```json
"setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
```

- lidar com async-storage no react-native
- [docs](https://react-native-community.github.io/async-storage/docs/advanced/jest/)
- escolha do Diego "With Jest setup file"
  - criar um arquivo no src "setupTests.ts"
  - adicionar nova config no jest no package.json


```javascript
// dentro do setupTests.ts
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
```
```json 
// no package.json
  "setupFiles": ["./src/setupTests.ts"]
```

- lidando com [React native gesture handler](https://docs.swmansion.com/react-native-gesture-handler/docs/getting-started.html)
- add no package.json
```json
"setupFiles": ["./node_modules/react-native-gesture-handler/jestSetup.js"]
```

```sh
yarn test --watchAll true
yarn test --coverage
```