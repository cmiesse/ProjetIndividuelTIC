package be.cmiesse.tfStockAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VilleDTO {
    private Long postalCode;
    private String name;
    private String nameNL;
    private String locationLink;
}
