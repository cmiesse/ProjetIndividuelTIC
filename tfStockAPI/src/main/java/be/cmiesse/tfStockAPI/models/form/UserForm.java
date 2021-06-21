package be.cmiesse.tfStockAPI.models.form;

import be.cmiesse.tfStockAPI.entity.Ville;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserForm {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private Long city;
    private List<String> roles;
    private List<Long> chosenTypes;
    private List<Long> chosenProducts;
}
