package engsoftware.trabalhoeventos.service;

import java.util.List;

import engsoftware.trabalhoeventos.model.Organizador;
import engsoftware.trabalhoeventos.repository.OrganizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizadorService {

    private final OrganizadorRepository organizadorRepository;

    public OrganizadorService(OrganizadorRepository organizadorRepository) {
        this.organizadorRepository = organizadorRepository;
    }

    public List<Organizador> getAll() {
        return organizadorRepository.findAll();
    }

    public Organizador save(Organizador organizador) {
        return organizadorRepository.save(organizador);
    }

    public void delete(Long id) {
        organizadorRepository.deleteById(id);
    }

}
