# Site de Eventos

Plataforma web para divulgação e gestão de eventos locais (shows, festas, bares, restaurantes, eventos ao ar livre, entre outros), com áreas separadas para quem organiza e para quem participa.

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)

## Sobre o projeto

O Site de Eventos é uma aplicação full stack desenvolvida para a disciplina de Engenharia de Software II, na Universidade Estadual de Londrina (UEL). O sistema resolve o problema de centralizar a divulgação de eventos locais em um único lugar, permitindo que organizadores publiquem e gerenciem seus eventos, e que usuários busquem, consultem detalhes e avaliem os eventos de que participaram.

O projeto foi construído em duas partes independentes que se comunicam via API REST: um back-end em **Spring Boot** responsável pelas regras de negócio e persistência dos dados, e um front-end em **React** responsável pela interface com a qual organizadores e usuários interagem.

## Conceitos e decisões técnicas

Durante o desenvolvimento, aplicamos e discutimos os seguintes conceitos:

- **Arquitetura em camadas (Controller → Service → Repository):** separamos a lógica de rotas HTTP, regras de negócio e acesso a dados em camadas distintas, facilitando manutenção e testes.
- **API RESTful:** toda comunicação entre front-end e back-end acontece por requisições HTTP (`GET`, `POST`, `DELETE`) que trocam dados em JSON, seguindo o padrão REST.
- **ORM com JPA/Hibernate:** as entidades do domínio (`Usuario`, `Organizador`, `Evento`, `Avaliacao`) são mapeadas como classes Java anotadas com `@Entity`, e o Hibernate cuida da tradução entre objetos e tabelas do banco relacional, evitando SQL manual na maior parte do sistema.
- **Modelagem relacional com chaves estrangeiras:** `Avaliacao` se relaciona com `Usuario` e `Evento` através de `@ManyToOne`, representando que uma avaliação sempre pertence a um usuário e a um evento específico.
- **Single Page Application (SPA) com roteamento client-side:** o front-end usa `react-router-dom` para trocar de tela sem recarregar a página, controlando as rotas de login, cadastro, listagem e detalhes de eventos.
- **Gerenciamento de estado com React Hooks:** `useState` e `useEffect` controlam os dados dos formulários, o carregamento assíncrono de eventos/avaliações vindos da API, e a filtragem de eventos em tempo real na tela de listagem.
- **CORS (Cross-Origin Resource Sharing):** como front-end (`localhost:3000`) e back-end (`localhost:8080`) rodam em origens diferentes, configuramos explicitamente no Spring (`CorsConfig`) a liberação de acesso do front-end à API, sem a qual o navegador bloquearia as requisições.
- **Validação de dados com Bean Validation:** anotações como `@NotBlank`, `@NotNull`, `@Min` e `@Max` nas entidades garantem que dados obrigatórios (nome do evento, faixa de preço entre 1 e 5, etc.) sejam validados antes de chegar ao banco.
- **Injeção de dependências:** os `Services` e `Repositories` são gerenciados pelo container do Spring e injetados via construtor/`@Autowired`, sem instanciação manual.

## Tecnologias utilizadas

**Back-end**
- Java 17
- Spring Boot 3.5.3 (Spring Web, Spring Data JPA, Spring Boot Validation, Thymeleaf)
- Maven (gerenciador de dependências e build)

**Front-end**
- React 19
- React Router DOM (roteamento entre páginas)
- Axios / Fetch API (requisições HTTP para o back-end)
- Bootstrap 5 (estilização base dos componentes)
- React Icons

**Banco de dados**
- MySQL 8

**Comunicação**
- API REST em JSON, consumida pelo front-end via HTTP

## Funcionalidades

**Para usuários**
- Cadastro e login de conta de usuário
- Listagem de todos os eventos cadastrados, com imagem, nome, horário, local e faixa de preço (representada em cifrões, de `$` a `$$$$$`)
- Busca de eventos por nome, com resultado filtrado em tempo real conforme o usuário digita
- Página de detalhes do evento, com informações completas e link de redirecionamento para compra antecipada (quando disponível)
- Visualização das avaliações (em estrelas, de 1 a 5) deixadas por outros usuários em cada evento

**Para organizadores**
- Cadastro e login de conta de organizador (com nome, CPF/CNPJ, telefone, e-mail e senha)
- Cadastro de novos eventos, informando nome, data/horário, local, faixa de preço, detalhes, opção de publicidade paga e link de redirecionamento opcional
- Exclusão de eventos já cadastrados, com confirmação antes de remover

**Back-end / API**
- Endpoints REST para CRUD de usuários, organizadores, eventos e avaliações
- Autenticação simples por e-mail e senha para usuários e organizadores
- Validação automática dos dados recebidos antes da persistência no banco

## Como executar o projeto

O sistema é dividido em duas partes que precisam ser executadas separadamente: **back-end** (API) e **front-end** (interface). Rode o back-end primeiro, já que o front-end depende dele.

### Pré-requisitos

Antes de começar, tenha instalado:

- [JDK 17](https://adoptium.net/) ou superior
- [Node.js](https://nodejs.org/) (versão 18 ou superior) e npm
- [MySQL Server 8](https://dev.mysql.com/downloads/mysql/) em execução localmente
- Git

> O back-end usa o Maven Wrapper (`mvnw`), então não é necessário ter o Maven instalado separadamente.

### 1. Clonar o repositório

```bash
git clone https://github.com/LiviaKouketsu/Engenharia-de-Software-II.git
cd Engenharia-de-Software-II
```

### 2. Configurar o banco de dados

Crie o schema no MySQL (você pode usar o script `sistema_eventos.sql` incluído na raiz do projeto como referência, ou deixar o Hibernate criar as tabelas automaticamente no primeiro start):

```sql
CREATE SCHEMA sistema_eventos;
```

Abra o arquivo `trabalhoeventos/src/main/resources/application.properties` e ajuste o usuário e a senha do seu MySQL local:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_eventos
spring.datasource.username=root
spring.datasource.password=sua_senha_aqui
```

> Opcional: para popular o banco com alguns dados de teste, execute o script `inserindo_dados.sql` (também na raiz do projeto) depois que as tabelas forem criadas.

### 3. Executar o back-end (API)

```bash
cd trabalhoeventos
```

No Linux/macOS:
```bash
./mvnw spring-boot:run
```

No Windows:
```bash
mvnw.cmd spring-boot:run
```

O Maven vai baixar as dependências automaticamente na primeira execução. A API sobe em `http://localhost:8080`.

### 4. Executar o front-end (interface)

Em um novo terminal, a partir da raiz do projeto:

```bash
cd trabalhoeventosreact
npm install
npm start
```

A aplicação abre automaticamente em `http://localhost:3000`, já conectada à API rodando na porta 8080.

## Autores

Projeto desenvolvido em grupo para a disciplina de Engenharia de Software II — UEL:

- **Livia Kouketsu Da Silva**
- **Matheus Henrique Nonsiboni**
- **João Vitor Santos**
