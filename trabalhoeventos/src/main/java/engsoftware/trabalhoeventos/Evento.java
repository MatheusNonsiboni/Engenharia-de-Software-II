package engsoftware.trabalhoeventos;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "O nome do evento é obrigatório")
    private String nome;
    @NotNull(message = "A data e o horário são obrigatórios")
    private LocalDateTime dataHorario;
    @NotBlank(message = "O local do evento é obrigatório")
    private String local;
    @Min(value = 1, message = "O nível de preço deve ser no mínimo 1")
    @Max(value = 5, message = "O nível de preço deve ser no máximo 5")
    private int nivelPreco;
    private boolean publicidade;
    private String linkRedirecionamento;
    @NotBlank(message = "Os detalhes do evento são obrigatórios")
    @Lob
    private String detalhes;

    @ManyToOne
    @JoinColumn(name = "organizador_id")
    private Organizador organizador;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDateTime getDataHorario() {
        return dataHorario;
    }

    public void setDataHorario(LocalDateTime dataHorario) {
        this.dataHorario = dataHorario;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public int getNivelPreco() {
        return nivelPreco;
    }

    public void setNivelPreco(int nivelPreco) {
        this.nivelPreco = nivelPreco;
    }

    public boolean isPublicidade() {
        return publicidade;
    }

    public void setPublicidade(boolean publicidade) {
        this.publicidade = publicidade;
    }

    public String getLinkRedirecionamento() {
        return linkRedirecionamento;
    }

    public void setLinkRedirecionamento(String linkRedirecionamento) {
        this.linkRedirecionamento = linkRedirecionamento;
    }

    public String getDetalhes() {
        return detalhes;
    }

    public void setDetalhes(String detalhes) {
        this.detalhes = detalhes;
    }

    //organizador ainda não está implementado
    public Organizador getOrganizador() {
        return organizador;
    }

    //organizador ainda não está implementado
    public void setOrganizador(Organizador organizador) {
        this.organizador = organizador;
    }
}
