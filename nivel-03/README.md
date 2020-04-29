# Introdução
Nível 03 do curso GoStack 11

# Comandos

## GoBarber
-- Deal with form
- yarn add @unform/core @unform/web

-- Lib de validação dos campos
- yarn add yup
- yarn add @types/yup -D

-- iniciando-back-end
- yarn add cors

-- deal with ids
- yarn add uuidv4

# Conselhos
## Leis dentro do react
- Sempre que criar uma função dentro de um componente, não criar dentro dela diretamente,
como uma "function",
ao inves disso iremos utilizar um hook chamado "useCallback"
- useCallback: uma forma de criar funções dentro do componentes mas que não é recriado toda vez que o componentes é chamado, elas são memorizadas, salvas na memoria e so atualizar quando você achar melhor.