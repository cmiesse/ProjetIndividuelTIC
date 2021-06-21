package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.MessageDTO;
import be.cmiesse.tfStockAPI.models.dto.VilleDTO;
import be.cmiesse.tfStockAPI.models.form.MessageForm;
import be.cmiesse.tfStockAPI.service.VilleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/villes")
public class VilleController {

    private final VilleService service;


    public VilleController(VilleService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<VilleDTO> getById(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<VilleDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<VilleDTO> insert(@RequestBody VilleDTO form) {
        return ResponseEntity.status(200).body(service.insert(form));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<VilleDTO> update(@RequestBody VilleDTO form, @PathVariable Long id) throws ElementNotFoundException {
        service.update(form,id);
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<VilleDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        VilleDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }
}
