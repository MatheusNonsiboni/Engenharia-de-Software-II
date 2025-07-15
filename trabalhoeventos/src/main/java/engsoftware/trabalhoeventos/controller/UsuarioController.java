package engsoftware.trabalhoeventos.controller;

import engsoftware.trabalhoeventos.model.Organizador;
import engsoftware.trabalhoeventos.model.Usuario;
import engsoftware.trabalhoeventos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.salvar(usuario));
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscar(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("deletar/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        usuarioService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        String email = usuario.getEmail();
        String senha = usuario.getSenha();

        Usuario encontrado = usuarioService.autenticar(email, senha);
        if (encontrado != null) {
            return encontrado;
        } else {
            return null;
        }
    }


}