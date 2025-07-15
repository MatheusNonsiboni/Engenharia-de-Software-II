package engsoftware.trabalhoeventos.controller;

import engsoftware.trabalhoeventos.model.Evento;
import engsoftware.trabalhoeventos.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/eventos")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    // Lista todos os eventos (GET /eventos)
    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        List<Evento> eventos = eventoService.getAll();
        return ResponseEntity.ok(eventos);
    }

    // Busca eventos por nome (GET /eventos/buscar?nome=...)
    @GetMapping("/buscar")
    public ResponseEntity<List<Evento>> buscarEventos(@RequestParam String nome) {
        List<Evento> eventos = eventoService.buscarPorNome(nome);
        return ResponseEntity.ok(eventos);
    }

    // Cadastra novo evento (POST /eventos)
    @PostMapping
    public ResponseEntity<Evento> salvarEvento(@Valid @RequestBody Evento evento) {
        // Validação manual para campos adicionais (opcional)
        if (evento.getNome() == null || evento.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        Evento eventoSalvo = eventoService.save(evento);
        return ResponseEntity.ok(eventoSalvo);
    }

    // Exclui evento (DELETE /eventos/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}