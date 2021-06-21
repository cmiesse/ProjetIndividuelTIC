package be.cmiesse.tfStockAPI.models.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateUserForm {
    private String email;
    private Long city;
    private List<Long> chosenTypes;
    private List<Long> chosenProducts;
}
