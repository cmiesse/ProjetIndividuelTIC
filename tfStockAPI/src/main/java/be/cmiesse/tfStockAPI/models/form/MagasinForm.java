package be.cmiesse.tfStockAPI.models.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MagasinForm {
    private String name;
    private String street;
    private Integer number;
    private Long city;
    private String locationLink;
}
