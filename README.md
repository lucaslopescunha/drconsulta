# Dr consulta

## Introdução

Projeto criado para https://github.com/DrConsulta/desafio-entrevista-nodejs que possui:

- CRUD de Estabelecimento
- CRUD de Veiculos
- Controle de entrada e saída de veículos

## Instalação

Desenvolvido usando node v22.12.0

### Passos para instalação
1. Clone o repositório https://github.com/lucaslopescunha/drconsulta 
2. Navegue até o diretório do projeto: `cd drconsulta`
3. Vá no diretório raiz do projeto e execute `npm install`.

## Configuração

- No arquivo .env estão preenchidas as propriedades
- Criar um banco de dados com a porta 3306, localhost com o nome estacionamento, usuário root e senha lucas

- Execute as migrations com:
```
npm run migration:run
```  

## Migrations

Criar uma migration:
```
npm run migration:create -name=nome-da-migration
```

Executar as migrations:
```
  npm run migration:run
```

Reverter as migrations:
```
  npm run migration:revert
```  
## Uso

O drconsulta expõe um endpoint para cadastro, atualização, busca e exclusão de estabelecimento e veiculos. Também foi desenvolvido um endpoint para criação de usuários e um endpoint de autenticação, onde é possível realizar o login passando um usuário e senha. Também foi criada um controle de entrada e saída de veículos.

### Curls

Faça o copy dos Curls abaixo e paste no seu testador de apis favorito. No meu caso utilizo o [Postman](https://www.postman.com/).

#### Usuários
```
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data '{
    "username": "usuario",
    "password": "senha"
}'
```

#### Autenticação
```
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "user",
    "password": "password"
}'
```

#### Veículos

##### Criar
```
curl --location 'http://localhost:3000/veiculos' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data '{
    "modelo": "modelo",
    "cor": "B",
    "placa": "PLACA",
    "tipo": "C",
    "marca": "marca"
}'
```

##### Alterar (O parâmetro ID precisa ser preenchido com o ID do veículo)

```
curl --location --request PUT 'http://localhost:3000/veiculos/ID' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data '{
    "modelo": "modelo",
    "cor": "cor",
    "placa": "placa",
    "tipo": "C",
    "marca": "marca"
}'
```
##### Delete

```
curl --location --request DELETE 'http://localhost:3000/veiculos/ID' \
--header 'Authorization: Bearer token'
```

##### Find by id

```
curl --location 'http://localhost:3000/veiculos/ID' \
--header 'Authorization: Bearer token'
```

##### Find All (parâmetros: modelo, placa, tipo)

```
curl --location 'http://localhost:3000/veiculos?tipo=tipo&modelo=modelo&placa=placa' \
--header 'Authorization: Bearer token'
```

#### Estabelecimento

##### Criar estabelecimento
```
curl --location 'http://localhost:3000/estabelecimento' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data '{
    "cnpj": "cnpj",
    "nome": "nome",
    "endereco": "endereço",
    "telefone": "1132225456",
    "qtdeVagasCarro": 2,
    "qtdeVagasMoto": 2
}'
```
##### Update Estabelecimento
```
curl --location --request PUT 'http://localhost:3000/estabelecimento/10' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiZnRlc3RlIiwiaWF0IjoxNzM1OTIzMDg4LCJleHAiOjE3MzU5MjY2ODh9.Y376Z1aZW9L-Swvm-hDkw43mddY17LVr1h2n6B6f1EQ' \
--data '{
    "cnpj": "cnpj",
    "nome": "nome",
    "endereco": "endereco",
    "telefone": "telefone",
    "qtdeVagasCarro": 2,
    "qtdeVagasMoto": 2
}'
```
##### Get Estabelcimento by id 
```
curl --location 'http://localhost:3000/estabelecimento/ID' \
--header 'Authorization: Bearer token'
```
##### Get Estabelecimento com parâmetros cnpj e nome
```
curl --location 'http://localhost:3000/estabelecimento?cnpj=cnpj&nome=nome' \
--header 'Authorization: Bearer token'
```
##### Delete Estabelecimento por id
```
curl --location --request DELETE 'http://localhost:3000/estabelecimento/ID' \
--header 'Authorization: Bearer token'
```
#### Controle de entrada e saída de veículos. Entrada E, Saída S
```
curl --location 'http://localhost:3000/controle' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data '{
    "veiculo": idveiculo,
    "estabelecimento": idestabelecimento,
    "dtEntrada": "2024-12-16T00:01:00",
    "qtdeVagasCarro": 2,
    "qtdeVagasMoto": 2,
    "tipo": "E" 
}'