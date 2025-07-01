CREATE SCHEMA sistema_eventos;
USE sistema_eventos;

DROP DATABASE sistema_eventos;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE organizador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE, -- CPF ou CNPJ
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_horario DATETIME NOT NULL,
    local VARCHAR(255) NOT NULL,
    nivel_preco TINYINT NOT NULL, -- Níveis: 1, 2, 3...
    publicidade BOOLEAN NOT NULL DEFAULT 0,
    link_redirecionamento VARCHAR(255) NULL,
    detalhes TEXT,
    organizador_id INT NOT NULL,
    FOREIGN KEY (organizador_id) REFERENCES organizador(id) ON DELETE CASCADE
);

CREATE TABLE avaliacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nota TINYINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    usuario_id INT NOT NULL,
    evento_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON DELETE CASCADE
);