package be.cmiesse.tfStockAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {
    private Long id;
    private String token;
    private String username;
    private List<String> roles;
    private String firstName;
    private String lastName;
    private String email;
    private VilleDTO city;
    private LocalDate createdAt;
    private List<TypeDTO> chosenTypes;
    private List<ProduitDTO> chosenProducts;
}
