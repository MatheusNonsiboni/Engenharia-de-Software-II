package engsoftware.trabalhoeventos.service;

import engsoftware.trabalhoeventos.model.Evento;
import engsoftware.trabalhoeventos.model.Organizador;
import engsoftware.trabalhoeventos.repository.EventoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public List<Evento> getAll() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> getById(Long id) {
        return eventoRepository.findById(id);
    }

    public Evento save(Evento evento) {
        return eventoRepository.save(evento);
    }

    public void delete(Long id) {
        eventoRepository.deleteById(id);
    }

    // (opcional) Buscar por nome
    public List<Evento> buscarPorNome(String nome) {
        return eventoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Optional<Evento> buscarPorId(Long id) {
        return eventoRepository.findById(id);
    }
}