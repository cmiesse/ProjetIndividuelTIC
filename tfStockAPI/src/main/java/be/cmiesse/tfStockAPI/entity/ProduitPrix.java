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
public class ProduitPrix {
    @EmbeddedId
    private ProduitPrixKey id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name="product_id")
    private Produit product;

    @ManyToOne
    @MapsId("shopId")
    @JoinColumn(name="shop_id")
    private Magasin shop;

    private double price;
}
