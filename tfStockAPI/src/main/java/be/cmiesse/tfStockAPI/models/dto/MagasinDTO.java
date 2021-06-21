package be.cmiesse.tfStockAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MagasinDTO {
    private Long id;
    private String name;
    private String street;
    private Integer number;
    private VilleDTO city;
    private String locationLink;
}
