package engsoftware.trabalhoeventos.repository;

import engsoftware.trabalhoeventos.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {
    List<Avaliacao> findByEventoId(Integer eventoId);
}
