package engsoftware.trabalhoeventos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.BeanUtils;
import engsoftware.trabalhoeventos.DTO.OrganizadorDTO;

@Entity
@Table(name = "organizador")
public class Organizador extends Usuario {

    @NotBlank(message = "O CPF ou CNPJ do organizador é obrigatório")
    private String documento;

    public Organizador() {
        super();
    }

//    public Organizador(OrganizadorDTO dto) {
//        super(dto);
//        this.documento = dto.getDocumento();
//    }


    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }
}

