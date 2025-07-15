import React, { useState } from "react";
import "./LoginUsuario.css";
import {Link, useNavigate} from "react-router-dom";

export default function LoginUsuario() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const dadosLogin = { email, senha };

        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosLogin),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro no servidor");
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setMensagem("Login realizado com sucesso!");
                    navigate("/eventos");
                } else {
                    setMensagem("Email ou senha inválidos.");
                }
            })
            .catch((err) => setMensagem(err.message));
    };

    return (
        <div className="login-container">
            <div className="login-sidebar"></div>

            <div className="login-content">
                <div style={{ width: "100%", maxWidth: "420px" }}>
                    <h2 className="login-title">Login</h2>

                    {mensagem && <div className="alert alert-info">{mensagem}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="senha" className="form-label">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                className="form-control"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-warning w-100">AVANÇAR</button>
                    </form>

                    <div className="login-footer mt-4 text-center">
                        <p>Não tem uma conta?</p>
                        <Link to="/cadastro-organizador">Cadastrar-se como organizador</Link><br />
                        <Link to="/cadastro-usuario">Cadastrar-se como usuário</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


