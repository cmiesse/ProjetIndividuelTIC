package be.cmiesse.tfStockAPI.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Annonce {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(nullable = false) private String quantity;
    @ManyToOne
    @JoinColumn(name="product_id")
    private Produit product;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name="shop_id")
    private Magasin shop;
    @Column(nullable = false) private LocalDateTime createdAt;
}
