package be.cmiesse.tfStockAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MessageDTO {
    private Long id;
    private String message;
    private UserDTO user;
    private boolean done;
}
