package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.MagasinDTO;
import be.cmiesse.tfStockAPI.models.form.MagasinForm;
import be.cmiesse.tfStockAPI.service.MagasinService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/magasins")
public class MagasinController {
    private final MagasinService service;

    public MagasinController(MagasinService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MagasinDTO> getById(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<MagasinDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<MagasinDTO> insert(@RequestBody MagasinForm form) {
        return ResponseEntity.status(200).body(service.insert(form));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<MagasinDTO> update(@RequestBody MagasinForm form, @PathVariable Long id) throws ElementNotFoundException {
        service.update(form,id);
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<MagasinDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        MagasinDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }
}
