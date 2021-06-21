package be.cmiesse.tfStockAPI.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Produit {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String link;

    @ManyToOne
    @JoinColumn(name="type_id")
    private Type type;

    @ManyToMany(mappedBy = "chosenProducts")
    private List<User> chosenBy;

    @OneToMany(mappedBy = "product")
    private List<ProduitPrix> prices = new ArrayList<>();
}
