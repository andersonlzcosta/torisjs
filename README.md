# TorisJS
É um framework open source do Vértice Coletivo para criação de sites e outras infraestruturas web.

Esse projeto só foi possível graças a Rede Abrigo e a iniciativa para gerar uma infra para aulas a distância com a mentalidade de abrir o código gerado.

## Conteúdo
* [Informações Gerais](#informações-gerais)
* [Instalação](#intalação)

## Informações Gerais
Esse projeto é construído com docker desde o ínicio para facilidade de deploy e setups locais. Porém é possível acessar cada aplicativo e rodar o servidor node.
Além do docker utilizamos principalmente de soluções baseadas em JavaScript. Confira a seguir os principais módulos utilizados.
  
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
    Para rodar essa instalação é recomendado ter um servidor Docker rodando na sua máquina ou instância e depois:


    ```
    $ git clone torisjs
    $ cd torisjs
    $ docker-compose build
    $ docker-compose up
    ```
