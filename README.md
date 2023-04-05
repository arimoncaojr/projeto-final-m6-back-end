Para clonar o repositório e configurar o projeto, siga os passos abaixo:

1. Clone o repositório utilizando a chave SSH:

git clone git@github.com:arimoncaojr/projeto-final-m6-back-end.git

2. Acesse o diretório do projeto:

cd projeto-final-m6-back-end

3. Instale as dependências:

yarn

4. Crie um arquivo .env no diretório raiz do projeto, usando o arquivo .env.example como modelo. Preencha as variáveis de ambiente apropriadas.

5. Execute as migrações no banco de dados para criar as tabelas e estruturas necessárias:

yarn typeorm migration:run -d src/data-source

5. Inicie o servidor de desenvolvimento:

yarn dev
