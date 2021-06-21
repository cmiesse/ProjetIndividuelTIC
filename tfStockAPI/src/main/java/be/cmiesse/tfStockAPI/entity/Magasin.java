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
public class Magasin {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String street;
    @Column(nullable = false) private Integer number;
    private String locationLink;
    @ManyToOne
    @JoinColumn(name="city_id")
    private Ville city;

    @OneToMany(mappedBy = "shop")
    private List<ProduitPrix> prices = new ArrayList<>();
}
