package be.cmiesse.tfStockAPI.models.form;

import be.cmiesse.tfStockAPI.models.dto.MagasinDTO;
import be.cmiesse.tfStockAPI.models.dto.ProduitDTO;
import be.cmiesse.tfStockAPI.models.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AnnonceForm {
    private String quantity;
    private Long product;
    private Long user;
    private Long shop;
}
