import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";

export default function CadastroUsuario() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome_completo: "",
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

        fetch("http://localhost:8080/usuarios/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao cadastrar");
                alert("Cadastro de usuário realizado com sucesso!");
                navigate("/"); // Redireciona para login
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-content">
                <div style={{ width: "100%", maxWidth: "460px" }}>
                    <h2 className="cadastro-title">CADASTRE-SE COMO USUÁRIO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome completo*</label>
                            <input
                                type="text"
                                name="nome_completo"
                                className="form-control"
                                value={form.nome_completo}
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


