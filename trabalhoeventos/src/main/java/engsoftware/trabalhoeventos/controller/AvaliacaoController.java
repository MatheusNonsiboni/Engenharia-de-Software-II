package engsoftware.trabalhoeventos.controller;

import engsoftware.trabalhoeventos.model.Avaliacao;
import engsoftware.trabalhoeventos.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping
    public ResponseEntity<Avaliacao> criar(@RequestBody Avaliacao avaliacao) {
        return ResponseEntity.ok(avaliacaoService.salvar(avaliacao));
    }

    @GetMapping
    public ResponseEntity<List<Avaliacao>> listar() {
        return ResponseEntity.ok(avaliacaoService.listarTodas());
    }

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<Avaliacao>> listarPorEvento(@PathVariable Integer eventoId) {
        return ResponseEntity.ok(avaliacaoService.listarPorEvento(eventoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> buscar(@PathVariable Integer id) {
        return avaliacaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        avaliacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}