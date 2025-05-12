# 🎬 Coleção Studio Ghibli

Aplicação desenvolvida com **React** e **TypeScript** para explorar os filmes do icônico estúdio **Studio Ghibli**. Os usuários podem marcar filmes como assistidos ou favoritos, aplicar filtros avançados, adicionar notas personalizadas e registrar anotações sobre cada obra.

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

1. Clone o repositório:

   ```bash
   git clone https://github.com/denis-junior/frontend-challenge-truckpag.git
   cd frontend-challenge-truckpag/frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute a aplicação:

   ```bash
   npm start
   # ou
   yarn start
   ```

4. Acesse a aplicação em:
   
   ```bash
   http://localhost:3000
   # ou
   http://localhost:5173
   ```

````

## 🚀 Tecnologias Utilizadas

- **React (TypeScript)** para construção da interface e lógica da aplicação
- **Bootstrap** para estilização responsiva e visual consistente
- **React Bootstrap** e **Material UI** para utilização de componentes de interface acessíveis e modernos
- **Material Icons** para ícones padronizados e visualmente agradáveis
- **usehooks-ts** para utilização de hooks reutilizáveis prontos e otimizados
- **Armazenamento local do navegador (localStorage)** para garantir que as preferências e anotações do usuário sejam mantidas entre sessões


## 📋 Requisitos Implementados

### Funcionalidades principais:
- ✅ Listagem de filmes com:
  - Imagem do filme
  - Título
  - Ano de lançamento
  - Duração
  - Sinopse
  - Diretor e Produtor
  - Nota Pública do Filme (campo `rt_score`)
- ✅ Marcação/Desmarcação do filme como assistido
- ✅ Marcação/Desmarcação do filme como favorito
- ✅ Filtragem dos filmes por título através de um campo de texto com highlight
- ✅ Filtragem dos filmes por sinopse do filme com destaque de highlight também
- ✅ Adição/Edição de notas de texto para cada filme desejado
- ✅ Adição/Edição de avaliação pessoal de 1 a 5 estrelas
- ✅ Filtros de filmes por:
  - Assistido
  - Favorito
  - Com anotação
  - Número de estrelas
- ✅ Ordenação de filmes (crescente/decrescente) por:
  - Título
  - Duração
  - Avaliação pessoal
  - Nota de avaliação (campo `rt_score`)

# Funcionalidades extras:
- ✅ Botão **"Clear All Filters"** Disponibilizado no centro da tela quando nenhum filme for encontrado
- ✅ Botão **"Clear All Filters"** no Navbar e no body central
- ✅ Responsividade básica com Bootstrap e Flex
- ✅ Toast para ações como Favoritar/Desfavoritar, Assistido/Não Assistido e Adição/Edição de notas de texto e avaliação


# 🧪 Testes

O projeto possui um teste automatizado básico configurado.

### ▶️ Como rodar o teste

Utilize um dos comandos abaixo no terminal, na raiz do projeto:

```bash
# Com npm
npm test

# Ou com yarn
yarn test


## 🔗 API utilizada

- [Studio Ghibli API](https://ghibliapi.vercel.app)

## ⛔ OBSERVAÇÃO
- No desenvolvimento do projeto eu não troquei minha conta do git configurada em minha máquina, pois utilizo duas contas, essa do fork e uma conta chamada DENISAZIMUT que foi a conta por onde acabei fazendo os pushs no projeto do desafio. ambas as contas se tratam de mim mesmo porém estou explicando para não haver dúvidas a respeito, mas me encontro a disposição caso haja alguma.