package engsoftware.trabalhoeventos.controller;

import engsoftware.trabalhoeventos.repository.EventoRepository;
import engsoftware.trabalhoeventos.model.Evento;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    //lista eventos
    @GetMapping
    public String listarEventos(Model model) {
        List<Evento> eventos = eventoRepository.findAll();
        model.addAttribute("eventos", eventos);
        return "eventos"; // eventos.html
    }

    //busca eventos
    @GetMapping("/buscar")
    public String buscarEventos(@RequestParam("nome") String nome, Model model) {
        List<Evento> eventos = eventoRepository.findByNomeContainingIgnoreCase(nome);
        model.addAttribute("eventos", eventos);
        model.addAttribute("busca", nome);
        return "eventos";
    }

    //cadastrar evento
    @GetMapping("/cadastrar-evento")
    public String mostrarFormulario(Model model) {
        model.addAttribute("evento", new Evento());
        return "cadastro-evento";
    }

    //salvar evento
    @PostMapping
    public String salvarEvento(@Valid @ModelAttribute Evento evento, BindingResult result) {
        if (result.hasErrors()) {
            return "cadastro-evento";
        }
        eventoRepository.save(evento);
        return "redirect:/eventos";
    }

    //excluir evento
    @GetMapping("/excluir/{id}")
    public String excluirEvento(@PathVariable Long id) {
        eventoRepository.deleteById(id);
        return "redirect:/eventos";
    }
}