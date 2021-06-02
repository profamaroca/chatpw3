# AULA 01

configuração de ambiente usando o yarn
> yarn init -y
> yarn add express
> yarn add @types/express -D

usando o Typescript como dependência de desenvolvimento
> yarn add typescript -D

cria o arquivo tsconfig.json
> yarn tsc --init

editar tsconfig.json:
  "strict": false

criar pasta src + arquivo server.ts dentro dela

você pode usar o seguinte código para teste:
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })



reinicia o server compilando com tsc
> yarn add ts-node-dev -D

editar package.json:
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },

para subir o server:
> yarn dev

# AULA 02

tipos de BD (relacionais ou não), drivers/pacotes

instalar dependências no projeto
> yarn add typeorm reflect-metadata sqlite3

criar ormconfig.json na raiz do projeto
  {
    "type": "sqlite"
  }

dentro da pasta src, criar pasta database e arquivo index.ts com o código:
  import { createConnection} from "typeorm";
  createConnection();

adicionar ao server.ts:
  import "./database";

adicionar script ao package.json:
  "typeorm": "ts-node-dev node_modules/typeorm/cli.js"

migrations: histórico de modificações no banco
dentro da pasta database, criar pasta migrations

adicionar ao ormconfig.json:
  "database": "./src/database/database.sqlite",
  "migrations": ["./src/database/migrations/**.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }

criar a primeira migration (implementação da MigrationInterface)
> yarn typeorm migration:create -n CreateSettings
novo arquivo criado em src/database/migrations
adicionar código aos métodos up e down
> yarn typeorm migration:run
database.sqlite criado dentro da pasta database
usar o beekeeper para visualização

entidades (object relational mapping)
na pasta src, criar a pasta entities e dentro dela o arquivo Setting.ts
adicionar código para criação do modelo do objeto
adicionar caminho das entities ao ormconfig.json
editar tsconfig.json descomentando experimentalDecorators e emitDecoratorMetadata (por causa do TS)

geração uuid como responsabilidade do app, não do banco
> yarn add uuid
> yarn add @types/uuid -D
adicionar ao Setting.ts o import do uuid e seu uso pelo constructor

repositórios
imagino que seja o equivalente ao DAO
na pasta src, criar pasta repositories e arquivo SettingsRepository.ts
adicionar o código que realizará as ops junto ao banco

criar arquivo routes.ts na pasta src e remover rotas do server.ts

criar src/controllers/SettingsController.ts e mover para lá todo o trabalho com os repositórios
as rotas passam a chamar os controllers

## continuar
# AULA 03

os controllers estavam incluindo tb as regras de negócio (no caso, o trabalho com os repositórios do bd),
que devem ser responsabilidade dos services
os controllers cuidam de requests, disparam os services e devolvem as responses
aprendi que métodos de repositórios e services precisam ser chamados com await

finalizando as tabelas do banco

## tabela users
> yarn typeorm migration:create -n CreateUsers
novo arquivo criado em src/database/migrations
adicionar código aos métodos up e down SALVAR
> yarn typeorm migration:run
se precisar desfazer
> yarn typeorm migration:revert
criar arquivo entities/Users.ts, adicionar código
criar arquivo database/repositories/UsersRepository.ts, adicionar código
criar UsersService
criar UsersController
adicionar rota /users
testar com o insomnia

## tabela messages
> yarn typeorm migration:create -n CreateMessages
novo arquivo criado em src/database/migrations
adicionar código aos métodos up e down SALVAR
> yarn typeorm migration:run
criar arquivo entities/Users.ts, adicionar código
criar arquivo database/repositories/UsersRepository.ts, adicionar código
criar UsersService
criar UsersController
adicionar rota /users
testar com o insomnia
adicionar métodos listByUser

# AULA 04

protocolo websocket para chats e trocas de mão dupla
> yarn add socket.io
> yarn add @types/socket.io -D

puxar pasta public com os estáticos
modificar arquivo server.ts para usar socket.io e arqs estáticos
> yarn add ejs
subir e acessar com o navegador, fron-end bunitinho veio pronto

> yarn add socket.io-client
criar pasta src/websocket com arquivos admin.ts e client.ts
criar arquivo src/http.ts e modificar o server.ts
trabalhar no public/js/chat.js e no client.ts

## tabela connections
> yarn typeorm migration:create -n CreateConnections
novo arquivo criado em src/database/migrations
adicionar código aos métodos up e down SALVAR
> yarn typeorm migration:run
criar arquivo entities/Connections.ts, adicionar código
criar arquivo database/repositories/ConnectionsRepository.ts, adicionar código
criar ConnectionsService
criar ConnectionsController
adicionar rota put /connections
testar com o insomnia

construção do websocket

# AULA 05

mostrar mensagens já trocadas pelo email do usuário

pagina do admin


