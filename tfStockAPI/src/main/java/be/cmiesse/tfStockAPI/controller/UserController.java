package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.UserDTO;
import be.cmiesse.tfStockAPI.models.form.ChangePasswordForm;
import be.cmiesse.tfStockAPI.models.form.UpdateUserForm;
import be.cmiesse.tfStockAPI.models.form.UserForm;
import be.cmiesse.tfStockAPI.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll(){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.getAll());
    }

    @PostMapping("/sign_up")
    public ResponseEntity<UserDTO> signUp(@RequestBody UserForm form){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.signUp(form));
    }

    @PostMapping("/sign_in")
    public ResponseEntity<UserDTO> signIn(@RequestBody UserForm form){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.signIn(form));
    }

    @PostMapping("/insert")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> insert(@RequestBody UserForm form){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.insert(form));
    }

    @PutMapping("/changePassword")
    public ResponseEntity<UserDTO> changePassword(@RequestBody ChangePasswordForm form) throws ElementNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.changePassword(form));
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<UserDTO> update(@RequestBody UpdateUserForm form, @PathVariable Long id) throws ElementNotFoundException{
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.update(form,id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.delete(id));
    }

}
