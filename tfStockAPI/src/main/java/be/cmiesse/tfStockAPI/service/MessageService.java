package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.Message;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.MessageMapper;
import be.cmiesse.tfStockAPI.models.dto.MessageDTO;
import be.cmiesse.tfStockAPI.models.form.MessageForm;
import be.cmiesse.tfStockAPI.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class MessageService implements CrudService<MessageDTO, MessageForm, Long>{
    private final MessageRepository repo;
    private final MessageMapper mapper;

    public MessageService(MessageRepository repo, MessageMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public MessageDTO getOne(Long id) throws ElementNotFoundException {
        return mapper.toDTO(repo.getOne(id));
    }

    @Override
    public List<MessageDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public MessageDTO insert(MessageForm form) {
        if(form==null) throw new IllegalArgumentException();
        Message saved = repo.save(mapper.formToEntity(form));
        return mapper.toDTO(saved);
    }

    public void update(MessageForm toUpdate, Long id) throws ElementNotFoundException{
        if(id==null || toUpdate == null) throw new IllegalArgumentException();
        Message entity= repo.findById(id).orElseThrow(()->new ElementNotFoundException(id));
        System.out.println("Avant : " +entity.isDone());
        entity.setDone(!entity.isDone());
        System.out.println("Après : " +entity.isDone());
        repo.save(entity);
    }

    @Override
    public void delete(Long id) throws ElementNotFoundException {
        if(id==null) throw new ElementNotFoundException(id);
        repo.deleteById(id);

    }
}
