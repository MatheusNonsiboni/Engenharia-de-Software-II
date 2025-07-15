import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUsuario from "./paginas/LoginUsuario";
import PaginaEventos from "./paginas/PaginaEventos";
import LoginOrganizador from "./paginas/LoginOrganizador";
import CadastrarEvento from "./paginas/CadastrarEvento";
import CadastroOrganizador from "./paginas/CadastroOrganizador";
import CadastroUsuario from "./paginas/CadastroUsuario";
import VerDetalhes from "./paginas/VerDetalhes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginUsuario />} />
                <Route path="/eventos" element={<PaginaEventos />} />
                <Route path="/login-organizador" element={<LoginOrganizador />} />
                <Route path="/cadastrar-evento" element={<CadastrarEvento />} />
                <Route path="/cadastro-organizador" element={<CadastroOrganizador />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
                <Route path="/eventos/:id" element={<VerDetalhes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

