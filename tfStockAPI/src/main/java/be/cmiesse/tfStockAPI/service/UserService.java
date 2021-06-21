package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.User;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.UserDTO;
import be.cmiesse.tfStockAPI.models.form.ChangePasswordForm;
import be.cmiesse.tfStockAPI.models.form.UpdateUserForm;
import be.cmiesse.tfStockAPI.models.form.UserForm;

import java.util.List;

public interface UserService {
    UserDTO insert(UserForm form);
    UserDTO signIn(UserForm form);
    UserDTO signUp(UserForm form);
    List<UserDTO> getAll();
    UserDTO changePassword(ChangePasswordForm form) throws ElementNotFoundException;
    UserDTO update(UpdateUserForm form, Long id) throws ElementNotFoundException;
    UserDTO delete(Long id) throws ElementNotFoundException;
}
