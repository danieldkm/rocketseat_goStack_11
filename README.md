# Back-end

## Comandos
- yarn init -y
- yarn add express

# Front-end

## Comandos

- mkdir frontend
- cd frontend
- yarn init -y
- mkdir src
- mkdir public
- yarn add react react-dom
- yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
- yarn add @babel/cli
- yarn babel src/index.js --out-file public/bundle.js
- yarn add babel-loader
- yarn webpack --mode development //converter aquivos
- yarn add webpack-dev-server -D
- yarn webpack-dev-server --mode development

- yarn add style-loader css-loader
- yarn add file-loader

- yarn add axios
- yarn add cors (backend)

- yarn add @babel/plugin-transform-runtime -D

### Mobile
- adb devices
- react-native init mobile
- react-native run android

### TypeScript
- yarn add typescript -D
- yarn add express
- yarn add -D @types/express
- yarn tsc .\src\index.ts //converter TS para JS
- yarn tsc --init
- yarn tsc

# Links
[Configurar React Native by RocketSeat](https://react-native.rocketseat.dev/)

# Conceitos

## Rota / recurso
 
## Métodos HTTP:
- GET: Buscar/listar uma informação do back-end
- POST: Criar uma informação do back-end
- PUT: Alterar uma informação do back-end
- DELETE: Deletar uma informação do back-end

## Tipos de parâmetros:
- Query params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
- Route params: Parâmetros utilizados para identificar recursos
- Request Body: Corpo da requisição, utilizado para criar ou alterar recursos

    ### express types request
    - request.query
    - request.params
    - request.body

## Middleware:
- Interceptador de requisições que interrope totalmente a requisição ou alterar dados da requisição.

## [Babel](https://babeljs.io/)

- Converter (transpilar código do React para um código que o browser entenda

## Webpack

- Pra cada tipo de arquivo (.js, .css, .png) eu vou converter o código de uma maneira diferente

### Loaders
- babel-loader
- css-loader
- image-loader

## React
### JSX
- HTML dentro do JavaScript (Javascript XML)

### Fragment
- formato <>
- não reproduz nenhum efeito visual

### Componente
- "< Componente />"
### Propriedade
- passar variaveis no componente
- props.children: são codigos html entre o componente
### Estado & Imutabilidade
- [projects, setProjects] = useState retorna um array com 2 posições
    1. Variável com o seu valor inicial
    2. Função para atualizarmos esse valor
- Nunca alterar o valor da variavel diretamente (imutabilidade)
- useEffect 
    1. dispara funções sempre que tiver uma informação alterada.
    2. parametro 1 função a ser disparada.
    3. parametro 2 quais variaveis será alterada para disparar a função acima.
### React Native
- Não utiliza as mesmas tags do html
- Não há semantica igual no html web
- O style é um objeto
- Versão do React para desenvolvimento mobile
- Multiplataforma
- Podemos manipular cada plataforma de forma diferente
- Interface nativa ou híbirda?
- Código não é transpilado
- Outras plataformas migrando, Microsoft com Windows

#### Arquitetura
- JS -> Metro Budler (packager) -> Bundle -> Bridge -> Android ou Iphone (Objective C)

#### Sintaxe
- A declaração de componentes é igual ao web
- Não usamos HTML e sim componentes próprios
- Aplicamos estilo sem classes ou ID's
- Todo texto é <Text/> não existe estilização própria
- Não possuem valor semântico (significado)
    - Todos componentes possuem por padrão "display: flex"
    - Não possuem estilização própria
    - View: div, footer, header, main, aside, section
    - Text: p, span, strong, h1, h2, h3
- Conexão com backend no localhost
    - iOS com Emulador: localhost
    - iOS com físico: IP da máquina
    - Android com emulador: localhost (adb reverse tcp:3333 tcp:3333)
    - Android com emulador: 10.0.2.2 (Android Studio)
    - Android com emulador: 10.0.3.2 (Genymotion)
    - Android com físico: IP da máquina 


O que é Expo?
- SDK com um conjunto funcionalidades prontas para usar (câmera, vídeo, integrações)
- Não é necessários configurar emulador

Por que não vamos utilizar o Expo?
- Limitação sobre o controle do código nativo
- Várias bibliotecas não tem suporte para o Expo
- O Expo liberou seu conjunto de ferramentas prontas para serem utilizadas com projetos que não utilizam Expo

## TypeScript

- Por que TypeScript
    - Desafio: Incluir a informação da cidade de UF do usuário nesse retorno.
        - Qual o formato do objeto de usuário?
        - Utilizo user.city ou user.address.city?
        - Será que a cidade e UF são obrigatórias?
- IntelliSense
    - O editor não conhece o formato da variável user e, por isso, não consegue determinar suas propriedades.
    - Nesse caso. o editor consegue saber exatamente os dados que um usuário pode ter e oferecer inteligência de IDE.
- Mitos e verdades
    - TypeScript diminui a "produtividade" (verdade em curto prazo)
    - TypeScript é transformar JavaScript em Java ou C# (Mito)
    - O mercado não usa TypeScript (Mito) 
    - TypeScript substitui o JavaScript por completo (Mito)
    - TypeScript atrapalha quem é iniciante (Verdade depende de cada individuo)
- Sintaxe
    - Types: string, number, boolean, object, array
    - interfaces
 
## Banco de dados
- SQL: MySQL, SQLite, PostgreSQL, ORACLE, Microsoft SQL Server
- NoSQL: MongoDB, CouchDB, etc

## Deploy de app
- heroku (gratuito para teste) / digital ocean para node exemplo no canal do rocketseat do youtube.
- https://www.netlify.com/ (especifico para front) para react

## Estudos
- Padrões de código: ESLint, Prettier
- Autenticação JWT
- Styled Components
