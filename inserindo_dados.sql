USE sistema_eventos;


-- Inserção de usuários
INSERT INTO usuario (nome_completo, email, telefone, senha)
VALUES 
('Livia', 'livia@email.com','99999999', 'senha123'),
('Matheus', 'matheus@email.com', '99999999','senha123'),
('Joao', 'joao@email.com','99999999', 'senha123');

-- Inserção de organizadores
INSERT INTO organizador (nome, documento, email, telefone, senha)
VALUES 
('Livia', '12345678901', 'livia@org.com', '4499999999', 'senha123'),
('Matheus', '23456789012', 'matheus@org.com', '4488888888', 'senha123'),
('Joao', '34567890123', 'joao@org.com', '4477777777', 'senha123');

-- Inserção de eventos
INSERT INTO evento (nome, data_horario, local, nivel_preco, publicidade, link_redirecionamento, detalhes, organizador_id)
VALUES
('BALADA - MEIA ENTRADA ATÉ AS 20H00', '2025-07-20 20:00:00', 'Rua Juscelino Kubitsheck', 2, 1, NULL, 'Festa com DJs e bebidas promocionais', 1),
('HAPPY HOUR E MÚSICA AO VIVO',        '2025-07-21 18:30:00', 'Rua Juscelino Kubitsheck', 2, 0, NULL, 'Ambiente descontraído com drinks e banda ao vivo', 2),
('PEÇA DE TEATRO',                      '2025-07-22 20:30:00', 'Rua Juscelino Kubitsheck', 1, 0, NULL, 'Comédia com elenco premiado', 3),
('BAR E MÚSICA AO VIVO',               '2025-07-23 19:30:00', 'Rua Juscelino Kubitsheck', 2, 1, NULL, 'Bar animado com shows', 1),
('FESTA UNIVERSITÁRIA',                '2025-07-24 18:00:00', 'Rua Juscelino Kubitsheck', 1, 1, NULL, 'Evento exclusivo para universitários', 2),
('ROOFTOP COM VISTA PARA CIDADE',      '2025-07-25 19:00:00', 'Rua Juscelino Kubitsheck', 3, 1, NULL, 'Rooftop elegante com DJ e vista panorâmica', 3);

-- Inserção de avaliações
INSERT INTO avaliacao (nota, usuario_id, evento_id)
VALUES
(5, 1, 1),
(4, 2, 1),
(3, 3, 2),
(5, 1, 3),
(2, 2, 4),
(4, 3, 5),
(5, 1, 6);
 
SELECT * FROM avaliacao;
SELECT * FROM evento;
SELECT * FROM organizador;
SELECT * FROM usuario;

