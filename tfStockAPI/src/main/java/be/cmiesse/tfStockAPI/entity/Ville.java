package be.cmiesse.tfStockAPI.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Ville {
    @Id
    private Long postalCode;
    @Column(nullable = false) private String name;
    private String nameNL;
    private String locationLink;
}
