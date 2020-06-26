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