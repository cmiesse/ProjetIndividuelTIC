package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.entity.ProduitPrixKey;
import be.cmiesse.tfStockAPI.exception.ElementAlreadyExistsException;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.ProduitDTO;
import be.cmiesse.tfStockAPI.models.dto.ProduitPrixDTO;
import be.cmiesse.tfStockAPI.models.form.ProduitForm;
import be.cmiesse.tfStockAPI.models.form.ProduitPrixForm;
import be.cmiesse.tfStockAPI.service.ProduitPrixService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prix")
public class ProduitPrixController {
    private final ProduitPrixService service;

    public ProduitPrixController(ProduitPrixService service) {
        this.service = service;
    }
    @GetMapping("/{productId}/{shopId}")
    public ResponseEntity<ProduitPrixDTO> getById(@PathVariable Long productId, @PathVariable Long shopId) throws ElementNotFoundException {
        ProduitPrixKey id = ProduitPrixKey.builder()
                .productId(productId)
                .shopId(shopId)
                .build();
        try {
            return ResponseEntity.status(200).body(service.getOne(id));
        } catch (ElementNotFoundException e){
            return ResponseEntity.status(200).body(null);
        }

    }

    @GetMapping
    public ResponseEntity<List<ProduitPrixDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ProduitPrixDTO> insert(@RequestBody ProduitPrixForm form) throws ElementAlreadyExistsException {
        return ResponseEntity.status(200).body(service.insert(form));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{productId}/{shopId}/update")
    public ResponseEntity<ProduitPrixDTO> update(@RequestBody ProduitPrixForm form, @PathVariable Long productId, @PathVariable Long shopId) throws ElementNotFoundException{
        ProduitPrixKey id = ProduitPrixKey.builder()
                .productId(productId)
                .shopId(shopId).build();
        service.update(form,id);
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{productId}/{shopId}/delete")
    public ResponseEntity<ProduitPrixDTO> delete(@PathVariable Long productId, @PathVariable Long shopId) throws ElementNotFoundException {
        ProduitPrixKey id = ProduitPrixKey.builder()
                .productId(productId)
                .shopId(shopId)
                .build();
        ProduitPrixDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }

}
