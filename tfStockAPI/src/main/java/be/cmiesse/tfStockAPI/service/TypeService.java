package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.Type;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.TypeMapper;
import be.cmiesse.tfStockAPI.models.dto.TypeDTO;
import be.cmiesse.tfStockAPI.models.form.TypeForm;
import be.cmiesse.tfStockAPI.repository.TypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TypeService implements CrudService<TypeDTO, TypeForm, Long>{
    private final TypeRepository repo;
    private final TypeMapper mapper;

    public TypeService(TypeRepository repo, TypeMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public TypeDTO getOne(Long id) throws ElementNotFoundException {
        return mapper.toDTO(repo.getOne(id));
    }

    @Override
    public List<TypeDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public TypeDTO insert(TypeForm form) {
        if(form == null) throw new IllegalArgumentException();
        Type saved = repo.save(mapper.formToEntity(form));
        return mapper.toDTO(saved);
    }

    public void update(TypeForm toUpdate, Long id) throws ElementNotFoundException{
        if(id==null || toUpdate == null) throw new IllegalArgumentException();
        Type entity = repo.findById(id)
                .orElseThrow(()->new ElementNotFoundException(id));
        Type type = mapper.formToEntity(toUpdate);
        entity.setName(type.getName());
        repo.save(entity);
    }

    @Override
    public void delete(Long id) throws ElementNotFoundException {
        if (id==null) throw new ElementNotFoundException(id);
        repo.deleteById(id);
    }
}
