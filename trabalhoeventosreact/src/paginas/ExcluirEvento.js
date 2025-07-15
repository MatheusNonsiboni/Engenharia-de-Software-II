import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExcluirEvento() {
  const [eventos, setEventos] = useState([]);

  const carregarEventos = async () => {
    try {
      const resposta = await axios.get("http://localhost:8080/eventos");
      setEventos(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar eventos:", erro);
    }
  };

  const excluirEvento = async (id) => {
    const confirmar = window.confirm("Deseja realmente excluir este evento?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/eventos/excluir/${id}`);
      alert("Evento excluído com sucesso!");
      carregarEventos();
    } catch (erro) {
      console.error("Erro ao excluir evento:", erro);
      alert("Erro ao excluir evento.");
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">EXCLUIR EVENTOS</h2>

      {eventos.length === 0 ? (
        <p className="text-center">Nenhum evento encontrado.</p>
      ) : (
        <ul className="list-group">
          {eventos.map((evento) => (
            <li
              key={evento.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{evento.nome}</strong> —{" "}
                <small>{new Date(evento.dataHorario || evento.data_horario).toLocaleString()}</small>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => excluirEvento(evento.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}