package be.cmiesse.tfStockAPI.controller;

import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.models.dto.MagasinDTO;
import be.cmiesse.tfStockAPI.models.dto.MessageDTO;
import be.cmiesse.tfStockAPI.models.form.MagasinForm;
import be.cmiesse.tfStockAPI.models.form.MessageForm;
import be.cmiesse.tfStockAPI.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDTO> getById(@PathVariable Long id) throws ElementNotFoundException {
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @GetMapping
    public ResponseEntity<List<MessageDTO>> getByAll(){
        return ResponseEntity.status(200).body(service.getAll());
    }

    @PostMapping
    public ResponseEntity<MessageDTO> insert(@RequestBody MessageForm form) {
        return ResponseEntity.status(200).body(service.insert(form));
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<MessageDTO> update(@RequestBody MessageForm form, @PathVariable Long id) throws ElementNotFoundException {
        service.update(form,id);
        return ResponseEntity.status(200).body(service.getOne(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<MessageDTO> delete(@PathVariable Long id) throws ElementNotFoundException {
        MessageDTO toDelete = service.getOne(id);
        service.delete(id);
        return ResponseEntity.status(200).body(toDelete);
    }
}
