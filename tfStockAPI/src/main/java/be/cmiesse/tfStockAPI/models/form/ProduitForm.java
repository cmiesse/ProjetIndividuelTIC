package be.cmiesse.tfStockAPI.models.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProduitForm {
    private String name;
    private String link;
    private Long type;
}
