package be.cmiesse.tfStockAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProduitDTO {
    private Long id;
    private String name;
    private String link;
    private TypeDTO type;
}
