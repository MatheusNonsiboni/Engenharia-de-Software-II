package engsoftware.trabalhoeventos.repository;

import engsoftware.trabalhoeventos.model.Organizador;
import engsoftware.trabalhoeventos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByEmailAndSenha(String email, String senha);
}