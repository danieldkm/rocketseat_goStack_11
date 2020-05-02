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

-- pacote de animação no react
- [react-spring](https://www.react-spring.io/)
- yarn add react-spring

-- rotas
- yarn add react-router-dom
- yarn add -D @types/react-router-dom

## React Native
- se instalou o react-native-cli, pode desinstalar com npm ou yarn
- npx react-native init appgobarber --template react-native-template-typescript

Run instructions for iOS:
  • cd "C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-03\appgobarber" && npx react-native run-ios
  - or -
  • Open appgobarber\ios\appgobarber.xcodeproj in Xcode or run "xed -b ios"
  • Hit the Run button

Run instructions for Android:
  • Have an Android emulator running (quickest way to get started), or a device connected.
  • cd "C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-03\appgobarber" && npx react-native run-android

- yarn add eslint -D
- yarn eslint --init 
```sh
# $ C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-03\appgobarber\node_modules\.bin\eslint --init
# ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
# ? What type of modules does your project use? JavaScript modules (import/export)
# ? Which framework does your project use? React
# ? Does your project use TypeScript? Yes
# ? Where does your code run?
# ? How would you like to define a style for your project? Use a popular style guide
# ? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
# ? What format do you want your config file to be in? JSON
# Checking peerDependencies of eslint-config-airbnb@latest
# The config that you've selected requires the following dependencies:

# eslint-plugin-react@^7.19.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 eslint-plugin-import@^2.20.1 eslint-plugin-jsx-a11y@^6.2.3 eslint-plugin-react-hooks@^2.5.0 || ^1.7.0 @typescript-eslint/parser@latest
# ? Would you like to install them now with npm? No
# Successfully created .eslintrc.json file in C:\Users\danie\Documents\GoStack11\rocketseat_goStack_11\nivel-03\appgobarber
# Done in 40.17s.
```
- yarn add eslint-plugin-react@^7.19.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint-plugin-import@^2.20.1 eslint-plugin-jsx-a11y@^6.2.3 eslint-plugin-react-hooks@^2.5.0 @typescript-eslint/parser@latest

- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
- yarn add eslint-import-resolver-typescript -D
- copiar os arquivos de eslint do projeto anterior ("gobarber-web")
- remover "browser": true, do arquivo de configuração do eslint, pois o projeto não irá rodar no browser.
- yarn add styled-components
- yarn add -D @types/styled-components
- entre no site do react-navigation
- yarn add @react-navigation/native
- se for usar o expo copiar o codigo para ele
- yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
- se estiver usando macos ios:
  - instalar o cocoapods (equivalente ao yarn ou npm para ios)
  - acessar a past "ios" no projeto
  - rodar o comando pod install
- yarn add @react-navigation/stack
-- adicao de fonts
- npx react-native link / yarn react-native link

-- add icons
- yarn add react-native-vector-icons
  - se estiver no ios rodar o comando;
    - pod install
    - acessar a pasta ios e editar o arquivo Info.plist
      - adicionar na tag onde foi adicionada as fonts o feather
```xml
<string>Feather.ttf</string>
```
  - se estiver no android
    - acessar a pasta e editar arquivo: android/app/build.gradle, adicionar no final deste;
```gradle
project.ext.vectoricons = [
  iconsFontNames: ['Feather.ttf']
]
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```
- yarn add -D @types/react-native-vector-icons
-- Identificar a versao do iphone
- yarn add react-native-iphone-x-helper

- yarn add @unform/core @unform/mobile
# Conselhos
## Leis dentro do react
- Sempre que criar uma função dentro de um componente, não criar dentro dela diretamente,
como uma "function",
ao inves disso iremos utilizar um hook chamado "useCallback"
- useCallback: uma forma de criar funções dentro do componentes mas que não é recriado toda vez que o componentes é chamado, elas são memorizadas, salvas na memoria e so atualizar quando você achar melhor.