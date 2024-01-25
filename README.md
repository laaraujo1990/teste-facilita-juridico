# Teste de Programação Desenvolvedor Facilita Jurídico
## Leonardo Araújo 
### laaraujo1990@gmail.com - (35) 998231374

Requisito do teste:

Sistema de Gerenciamento de Clientes

## Parte 1

Uma empresa que realiza limpeza em residências enfrenta desafios no gerenciamento de seus clientes e busca uma solução eficiente para cadastrar e visualizar as informações que hoje são controladas em planilhas. Para centralizar as informações e ajudar na expansão da empresa, ela deseja uma plataforma onde seja possível gerenciar os seus clientes. O sistema deve ser composto por um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React.

A empresa utiliza as seguintes informações para gerenciar seus clientes: nome, email e telefone.

Na plataforma criada deve ser possível:
- Listar os seus clientes e filtrar com base nas informações cadastradas.
- Cadastrar clientes novos.

## Parte 2

Suponha que, além de cadastrar e visualizar clientes, a empresa deseja otimizar as rotas de atendimento para maximizar a eficiência na visitação dos clientes. Considere um mapa bidimensional representando a localização dos clientes, onde cada ponto cartesiano possui um cliente. Cada cliente cadastrado possui uma coordenada X e uma coordenada Y nesse mapa.

O objetivo é calcular a rota partindo da empresa (0,0) e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a menor distância possível.

O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.

Implemente um botão na tela de clientes que, ao ser clicado, abre uma modal e mostra a ordem de visitação dos clientes na rota calculada. A visualização pode ser a mais simples possível mostrando uma lista dos clientes na ordem que devem ser visitados do primeiro ao último cliente da rota.

Ao desenvolver essa segunda parte, altere a rota de cadastro e visualização para que seja possível cadastrar e visualizar as coordenadas X e Y dos clientes da empresa.


## Dependências

- Docker 

## Configuração Inicial

1) Clone o repositório

```
git clone https://github.com/laaraujo1990/teste-facilita-juridico.git
```

2. Suba o Docker
```bash
docker-compose up --build
```

3. Acesse o Backend [Node.js]
```
http://localhost:3000
```

4. Acesse o Frontend [React]
```
http://localhost:3001
```
