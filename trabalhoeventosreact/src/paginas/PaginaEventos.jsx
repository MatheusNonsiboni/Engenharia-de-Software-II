import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./PaginaEventos.css";

export default function PaginaEventos() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [filtro, setFiltro] = useState("");
    const eventosFiltrados = eventos.filter((evento) =>
        evento.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/eventos")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar eventos");
                return res.json();
            })
            .then((data) => {
                setEventos(data);
            })
            .catch((err) => {
                console.error(err);
                alert("Erro ao carregar eventos");
            });
    }, []);

    return (
        <>
            <div className="barra-topo d-flex align-items-center px-3">
                <button
                    className="btn btn-transparent text-white me-3"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Abrir menu lateral"
                >
                    <FaBars size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
                <div className="sidebar-header">
                    <h5>Menu</h5>
                    <button
                        className="btn btn-close"
                        aria-label="Fechar menu"
                        onClick={() => setSidebarOpen(false)}
                    ></button>
                </div>
                <ul className="sidebar-list list-unstyled">
                    <li>Eventos do dia</li>
                    <li>Shows</li>
                    <li>Peças de teatro</li>
                    <li>Restaurantes</li>
                    <li>Festas</li>
                    <li>Baladas</li>
                    <li>Bares</li>
                    <li>Música ao vivo</li>
                    <li>Eventos ao ar livre</li>
                    <li><strong>PARA ORGANIZADORES:</strong></li>
                    <li>
                        <button
                            className="btn btn-outline-warning w-100 mt-3"
                            onClick={() => navigate("/login-organizador")}
                        >
                            Cadastrar, alterar ou excluir evento
                        </button>
                    </li>
                </ul>
            </div>
            
            <div className="container mt-4">
                {/* Campo de busca */}
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Buscar evento pelo nome..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />

                {/* Resultados da busca */}
                {filtro && (
                    <>
                        <h5>Resultados da busca:</h5>
                        {eventosFiltrados.length === 0 ? (
                            <p>Nenhum evento encontrado com esse nome.</p>
                        ) : (
                            eventosFiltrados.map((evento) => (
                                <div key={`filtro-${evento.id}`} className="card mb-3 p-3 border-success">
                                    <h5>{evento.nome}</h5>
                                    <p><strong>Horário:</strong> {new Date(evento.dataHorario).toLocaleString()}</p>
                                    <p><strong>Local:</strong> {evento.local}</p>
                                    <p><strong>Preço:</strong> {"$".repeat(evento.nivelPreco)}</p>
                                    <p><strong>Informações:</strong> {evento.detalhes}</p>
                                    {evento.link_redirecionamento && (
                                        <a
                                            href={evento.link_redirecionamento}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-outline-success"
                                        >
                                            Ver detalhes
                                        </a>
                                    )}
                                </div>
                            ))
                        )}
                        <hr />
                    </>
                )}

                {/* Lista completa de eventos */}
                {eventos.length === 0 && <p>Nenhum evento encontrado.</p>}
                {eventos.map((evento) => (
                    <div key={evento.id} className="card mb-4 p-3 shadow-sm">
                        <img
                            src="/imagens/evento.jpg"
                            alt="Imagem do evento"
                            className="img-fluid mb-3 rounded"
                            style={{width: "300px", height: "auto"}}
                        />
                        <h5>{evento.nome}</h5>
                        <p><strong>Horário:</strong> {new Date(evento.dataHorario).toLocaleString()}</p>
                        <p><strong>Local:</strong> {evento.local}</p>
                        <p><strong>Preço:</strong> {"$".repeat(evento.nivelPreco)}</p>
                        <Link
                            to={`/eventos/${evento.id}`}
                            className="btn btn-outline-warning"
                        >
                            Ver detalhes
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}