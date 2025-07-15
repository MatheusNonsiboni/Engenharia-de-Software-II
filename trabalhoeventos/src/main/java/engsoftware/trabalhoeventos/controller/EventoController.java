package engsoftware.trabalhoeventos.controller;

import engsoftware.trabalhoeventos.model.Evento;
import engsoftware.trabalhoeventos.model.Organizador;
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

    @GetMapping
    public List<Evento> getAll(){
        return eventoService.getAll();
    }
    @GetMapping("/buscar")
    public ResponseEntity<List<Evento>> buscarEventos(@RequestParam String nome) {
        List<Evento> eventos = eventoService.buscarPorNome(nome);
        return ResponseEntity.ok(eventos);
    }
    @PostMapping
    public ResponseEntity<Evento> salvarEvento(@Valid @RequestBody Evento evento) {
        if (evento.getNome() == null || evento.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Evento eventoSalvo = eventoService.save(evento);
        return ResponseEntity.ok(eventoSalvo);
    }

    @DeleteMapping("/excluir/{id}")
        public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarPorId(@PathVariable Long id) {
        return eventoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}