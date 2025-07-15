import React, { useState } from "react";
import axios from "axios";
import "./style.css";

export default function CadastrarEvento() {
  const [exibirLink, setExibirLink] = useState(false);
  const [evento, setEvento] = useState({
    nome: "",
    dataHorario: "",
    local: "",
    nivelPreco: 1,
    publicidade: false,
    linkRedirecionamento: "",
    detalhes: ""
  });

  const handleCheckboxChange = () => {
    setExibirLink(!exibirLink);
    if (!exibirLink) {
      setEvento({...evento, linkRedirecionamento: ""});
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvento({
      ...evento,
      [name]: type === "checkbox" ? checked : value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Verifica se a data foi preenchida
    if (!evento.dataHorario) {
      throw new Error("Preencha a data e horário");
    }

    const dadosParaEnviar = {
      nome: evento.nome,
      dataHorario: evento.dataHorario + ":00", // Formato ISO
      local: evento.local,
      nivelPreco: Number(evento.nivelPreco) || 1, // Nome igual ao do BD
      publicidade: evento.publicidade,
      linkRedirecionamento: evento.linkRedirecionamento || null,
      detalhes: evento.detalhes,
    };

    console.log("Dados corrigidos:", dadosParaEnviar); // DEBUG
    await axios.post("http://localhost:8080/eventos", dadosParaEnviar);
    alert("Evento cadastrado!");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="page-container">
      <header className="header">
        <span className="titulo">PÁGINA DO ORGANIZADOR</span>
        <div className="button-group">
          <button className="botao">Cadastrar novo evento</button>
          <button className="botao">Alterar evento</button>
          <button className="botao">Excluir evento</button>
        </div>
      </header>

      <div className="container">
        <h2 style={{ color: "orange" }}>CADASTRAR NOVO EVENTO</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do evento*</label>
            <input 
              type="text" 
              name="nome"
              value={evento.nome}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Horário*</label>
            <input 
              type="datetime-local" 
              name="dataHorario"
              value={evento.dataHorario}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Local*</label>
            <input 
              type="text" 
              name="local"
              value={evento.local}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Faixa de preço*</label>
            <select 
              name="nivelPreco"
              value={evento.nivelPreco || 1}
              onChange={handleChange}
              required
            >
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>

          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="publicidade"
                checked={evento.publicidade}
                onChange={handleChange}
              />
              Deseja pagar pela publicidade?*
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={exibirLink}
                onChange={handleCheckboxChange}
              />
              Deseja inserir link de redirecionamento?*
            </label>
          </div>

          {exibirLink && (
            <div className="form-group">
              <label>Informe o link para redirecionamento:</label>
              <input 
                type="url" 
                name="linkRedirecionamento"
                value={evento.linkRedirecionamento}
                onChange={handleChange}
                placeholder="https://..." 
              />
            </div>
          )}

          <div className="form-group">
            <label>Detalhes e informações adicionais*</label>
            <textarea 
              name="detalhes"
              value={evento.detalhes}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className="submit-button" type="submit">
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}