package engsoftware.trabalhoeventos.model;

import engsoftware.trabalhoeventos.DTO.UsuarioDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "usuario")
public class Usuario {

    /* ---------- Atributos ---------- */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do usuário é obrigatório")
    private String nome;

    @Email(message = "E‑mail inválido")
    @NotBlank(message = "O e‑mail é obrigatório")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    private String senha;      // lembre‑se de salvar a senha *hash* e não texto puro

    @NotBlank(message = "O telefone é obrigatório")
    private String telefone;

    /* ---------- Construtores ---------- */

    /** construtor vazio exigido pelo JPA */
    public Usuario() {}

    /** construtor prático para mapear DTO → entidade */
    public Usuario(UsuarioDTO dto) {
        BeanUtils.copyProperties(dto, this);
    }

    /* ---------- Getters & Setters ---------- */

    public Long getId()                { return id; }
    public void setId(Long id)         { this.id = id; }

    public String getNome()            { return nome; }
    public void setNome(String nome)   { this.nome = nome; }

    public String getEmail()           { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha()           { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getTelefone()               { return telefone; }
    public void setTelefone(String telefone)  { this.telefone = telefone; }

    /* ---------- Stubs de domínio ---------- */

    public void login()  { /* delegar para AuthService / Spring Security */ }

    public void logout() { /* idem */ }

    public int pesquisarEvento(String termo) {
        // chamaria camada de serviço/repositório; devolvo 0 por enquanto
        return 0;
    }
}
