package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.Magasin;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.MagasinMapper;
import be.cmiesse.tfStockAPI.models.dto.MagasinDTO;
import be.cmiesse.tfStockAPI.models.form.MagasinForm;
import be.cmiesse.tfStockAPI.repository.MagasinRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class MagasinService implements CrudService<MagasinDTO, MagasinForm, Long>{
    private final MagasinRepository repo;
    private final MagasinMapper mapper;

    public MagasinService(MagasinRepository repo, MagasinMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public MagasinDTO getOne(Long id) throws ElementNotFoundException {
        return mapper.toDTO(repo.getOne(id));
    }

    @Override
    public List<MagasinDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public MagasinDTO insert(MagasinForm form) {
        if(form == null) throw new IllegalArgumentException();
        Magasin saved = repo.save(mapper.formToEntity(form));
        return mapper.toDTO(saved);
    }

    public void update(MagasinForm toUpdate, Long id) throws ElementNotFoundException{
        if(id==null || toUpdate == null) throw new IllegalArgumentException();
        Magasin entity = repo.findById(id)
                .orElseThrow(()->new ElementNotFoundException(id));
        Magasin mag = mapper.formToEntity(toUpdate);
        entity.setName(mag.getName());
        entity.setStreet(mag.getStreet());
        entity.setNumber(mag.getNumber());
        entity.setCity(mag.getCity());
        entity.setLocationLink(mag.getLocationLink());
        repo.save(entity);
    }

    @Override
    public void delete(Long id) throws ElementNotFoundException {
        if (id==null) throw new ElementNotFoundException(id);
        repo.deleteById(id);
    }
}
