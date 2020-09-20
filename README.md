# TorisJS
Esse é um projeto open source do Vértice Coletivo para criação de sites e outras infraestruturas web.

## Conteúdo
* [Informações Gerais](#informações-gerais)
* [Instalação](#intalação)

## Informações Gerais
Esse projeto é construído com docker desde o ínicio para facilidade de deploy e setups locais. Porém é possível acessar cada aplicativo e rodar o servidor node.
Além do docker utilizamos principalmente de soluções baseadas em JavaScript.
  
### Back End
  O back end é baseado em:
  * NodeJS
  * TypeScript
  * GraphQL com Apollow Server
  * TypeORM
    
### Front End
  O front end é baseado em:
  * ReactJS
    
## Intalação
    Para rodar essa instalação é recomendado ter Docker rodando na usa máquina e depois

    ```
    $ git clone torisjs
    $ cd torisjs
    $ docker-compose build
    $ docker-compose up
