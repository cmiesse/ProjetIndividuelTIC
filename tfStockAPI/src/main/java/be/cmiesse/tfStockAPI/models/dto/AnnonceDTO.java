package be.cmiesse.tfStockAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AnnonceDTO {
    private Long id;
    private String quantity;
    private ProduitDTO product;
    private UserDTO user;
    private MagasinDTO shop;
    private LocalDateTime createdAt;
}
