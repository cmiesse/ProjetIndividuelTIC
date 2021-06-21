package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.ProduitDTO;
import be.cmiesse.tfStockAPI.models.form.ProduitForm;
import be.cmiesse.tfStockAPI.service.ProduitService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produits")
public class ProduitController {
    private final ProduitService service;

    public ProduitController(ProduitService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProduitDTO> getById(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<ProduitDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ProduitDTO> insert(@RequestBody ProduitForm form) {
        return ResponseEntity.status(200).body(service.insert(form));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<ProduitDTO> update(@RequestBody ProduitForm form, @PathVariable Long id) throws ElementNotFoundException {
        service.update(form,id);
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<ProduitDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        ProduitDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }
}
