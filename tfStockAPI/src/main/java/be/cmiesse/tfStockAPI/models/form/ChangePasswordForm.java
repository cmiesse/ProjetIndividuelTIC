package be.cmiesse.tfStockAPI.models.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChangePasswordForm {
    private String oldPwd;
    private String newPwd;
    private String confirmation;
    private Long user;
}
