import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroOrganizador.css";

export default function CadastroOrganizador() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        cpfCnpj: "",
        telefone: "",
        email: "",
        senha: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dadosParaEnviar = {
            nome: form.nome,
            documento: form.cpfCnpj,
            telefone: form.telefone,
            email: form.email,
            senha: form.senha
        };

        fetch("http://localhost:8080/organizadores/cadastrar-organizador", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosParaEnviar)
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao cadastrar");
                return res.json();
            })
            .then(() => {
                alert("Cadastro de organizador realizado com sucesso!");
                navigate("/");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-content">
                <div style={{ width: "100%", maxWidth: "460px" }}>
                    <h2 className="cadastro-title">CADASTRE-SE COMO ORGANIZADOR</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome completo*</label>
                            <input
                                type="text"
                                name="nome"
                                className="form-control"
                                value={form.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CNPJ/CPF*</label>
                            <input
                                type="text"
                                name="cpfCnpj"
                                className="form-control"
                                value={form.cpfCnpj}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Telefone*</label>
                            <input
                                type="text"
                                name="telefone"
                                className="form-control"
                                value={form.telefone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email*</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Senha*</label>
                            <input
                                type="password"
                                name="senha"
                                className="form-control"
                                value={form.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-warning w-100">
                            CADASTRE-SE
                        </button>
                    </form>
                </div>
            </div>

            <div className="cadastro-sidebar" />
        </div>
    );
}



