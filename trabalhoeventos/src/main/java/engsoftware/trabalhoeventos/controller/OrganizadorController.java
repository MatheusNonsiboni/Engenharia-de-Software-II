package engsoftware.trabalhoeventos.controller;

import engsoftware.trabalhoeventos.model.Organizador;
import engsoftware.trabalhoeventos.service.OrganizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organizadores")
public class OrganizadorController {


    private final OrganizadorService organizadorService;

    @Autowired
    public OrganizadorController(OrganizadorService organizadorService) {
        this.organizadorService = organizadorService;
    }

    @GetMapping
    public List<Organizador> getAll(){
        return organizadorService.getAll();
    }

    @PostMapping("/cadastrar-organizador")
    public Organizador create(@RequestBody Organizador organizador){
        return organizadorService.save(organizador);
    }

    @GetMapping("/excluir-organizador/{id}")
    public void delete(@PathVariable Long id){
        organizadorService.delete(id);
    }
}
