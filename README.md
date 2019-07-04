# Projeto final da disciplina de Projeto de Software
## UFCG

Este repositório se refere ao frontend.
O backend está neste outro [repositório](https://github.com/rafaelgdp/psoft-projeto-back.git).

## Aluno:

* Rafael Guerra de Pontes

## Pastas

A pasta src está subdividida em admin_scripts e public. A primeira é um conjunto de scripts em node para facilitar o mock de requisições para operações como cadastro de disciplinas, comentários, cadastro de usuários, etc. A segunda é o diretório público principal do frontend.

Um arquivo config.json contém as rotas utilizadas em toda a aplicação. As principais páginas são separadas em suas respectivas pastas: register (cadastro), login (login), home (busca por disciplinas), profile (perfil de disciplina). Todas utilizam um componente de navbar criado por mim que está na pasta global_components. Dentro de cada pasta referente às páginas existem um .html e alguns .js para programar a lógica modularizada + alguns web components implementados à mão. Não foram utilizados frameworks de qualquer tipo.

A comunicação com o backend foi feito com requisições feitas com fetch.