import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VerDetalhes.css";

function Estrelas({ nota, max = 5 }) {
    return (
        <>
            {Array.from({ length: max }, (_, i) => (
                <span
                    key={i}
                    style={{ color: i < nota ? "#ffb400" : "#ddd", fontSize: "18px", marginRight: 2 }}
                    aria-label={i < nota ? "estrela preenchida" : "estrela vazia"}
                >
          &#9733;
        </span>
            ))}
        </>
    );
}

export default function VerDetalhes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [evento, setEvento] = useState(null);
    const [avaliacoes, setAvaliacoes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/eventos/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Evento não encontrado");
                return res.json();
            })
            .then(data => setEvento(data))
            .catch(err => {
                console.error(err);
                alert("Erro ao buscar evento");
            });

        fetch(`http://localhost:8080/avaliacoes/evento/${id}`)
            .then(res => res.json())
            .then(data => setAvaliacoes(data))
            .catch(err => console.error("Erro ao buscar avaliações:", err));
    }, [id]);

    if (!evento) return <p className="m-4">Carregando informações do evento...</p>;

    return (
        <>
            <div className="top-bar">Detalhes do Evento</div>

            <div className="container-verdetalhes">
                <button
                    className="btn btn-outline-secondary btn-voltar"
                    onClick={() => navigate("/eventos")}
                >
                    &larr; Voltar para eventos
                </button>

                <div className="detalhes-imagem">
                    <div className="detalhes-evento">
                        <h2>{evento.nome}</h2>
                        <p>
                            <strong>Horário:</strong>{" "}
                            {evento.dataHorario && !isNaN(new Date(evento.dataHorario))
                                ? new Date(evento.dataHorario).toLocaleString()
                                : "Data inválida"}
                        </p>
                        <p><strong>Local:</strong> {evento.local}</p>
                        <p><strong>Preço:</strong> {"$".repeat(evento.nivelPreco)}</p>
                        <h5>Mais informações:</h5>
                        <p>{evento.detalhes || "Nenhuma informação adicional."}</p>
                        {evento.linkRedirecionamento && (
                            <p>
                                <strong>Link para compra antecipada:</strong>{" "}
                                <a href={evento.linkRedirecionamento} target="_blank" rel="noreferrer">
                                    {evento.linkRedirecionamento}
                                </a>
                            </p>
                        )}
                    </div>

                    <img
                        src="/imagens/evento.jpg"
                        alt={`Imagem do evento ${evento.nome}`}
                        className="imagem-evento"
                    />
                </div>

                <h5>Avaliações dos usuários ({avaliacoes.length})</h5>
                <div className="comentarios">
                    {avaliacoes.length === 0 && <p>Nenhuma avaliação ainda para este evento.</p>}
                    {avaliacoes.map((avaliacao, i) => (
                        <div key={i} className="comentario">
                            <strong>{avaliacao.usuario.nomeCompleto || `Usuário ${i + 1}`}</strong>
                            <div>
                                <Estrelas nota={avaliacao.nota} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
