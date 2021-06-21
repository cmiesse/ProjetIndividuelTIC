package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.AnnonceDTO;
import be.cmiesse.tfStockAPI.models.form.AnnonceForm;
import be.cmiesse.tfStockAPI.service.AnnonceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annonces")
public class AnnonceController {
    private final AnnonceService service;

    public AnnonceController(AnnonceService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnonceDTO> getById(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<AnnonceDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<AnnonceDTO> insert(@RequestBody AnnonceForm form) {
        return ResponseEntity.status(200).body(service.insert(form));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<AnnonceDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        AnnonceDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }
}
