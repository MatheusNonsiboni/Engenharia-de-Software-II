package engsoftware.trabalhoeventos.service;

import engsoftware.trabalhoeventos.model.Organizador;
import engsoftware.trabalhoeventos.model.Usuario;
import engsoftware.trabalhoeventos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public void deletarPorId(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario autenticar(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

}
