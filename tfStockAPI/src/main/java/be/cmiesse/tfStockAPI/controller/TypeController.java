package be.cmiesse.tfStockAPI.controller;


import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.TypeDTO;
import be.cmiesse.tfStockAPI.models.form.TypeForm;
import be.cmiesse.tfStockAPI.service.TypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/types")
public class TypeController {
    
    private final TypeService service;

    public TypeController(TypeService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeDTO> getById(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<TypeDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<TypeDTO> insert(@RequestBody TypeForm form) {
        return ResponseEntity.status(200).body(service.insert(form));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<TypeDTO> update(@RequestBody TypeForm form, @PathVariable Long id) throws ElementNotFoundException {
        service.update(form,id);
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<TypeDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        TypeDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }
}
