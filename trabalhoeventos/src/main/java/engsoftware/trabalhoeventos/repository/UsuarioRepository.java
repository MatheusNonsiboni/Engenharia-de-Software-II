package engsoftware.trabalhoeventos.repository;

import engsoftware.trabalhoeventos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    boolean existsByEmail(String email);
}