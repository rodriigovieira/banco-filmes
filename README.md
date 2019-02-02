# Banco de Filmes

Esse é um web-app responsivo que consome a API do The Movie DB Database, permitindo buscas de filmes em seu catálogo.

O aplicativo foi feito utilizando o framework React, através da ferramenta Create-React-App.

O aplicativo pode ser visualizado ao vivo no link: https://banco-filmes.netlify.com/. Todavia, o aplicativo também pode ser instalado localmente. Basta seguir os passos abaixo:

# Instalação

Primeiro, tenha certeza que você possui o NodeJS instalado localmente em sua máquina.

Após isso, clone o projeto usando git. Execute o seguinte comando:

```
git clone https://github.com/rodriigovieira/banco-filmes.git
```

Após isso, acesse o diretório do projeto e efetue a instalação das dependências do projeto utilizando yarn. Execute o seguinte comando:

```
cd banco-filmes && yarn install
```

E pronto! A instalação foi concluída com sucesso.

# Utilização

O pacote dispõe de três comandos:

```
yarn start
```

Esse comando iniciará o servidor de desenvolvimento. O projeto rodará em sua máquina por poadrã na porta 3000. Se a porta já estiver ocupada, outra porta será utilizada e o link de acesso será disponibilizado após a finalização da execução do comando.

```
yarn build
```

Esse comando criará uma bundle de produção do projeto, caso você deseje efetuar o deploy para alguma aplicação.
