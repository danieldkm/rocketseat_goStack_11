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