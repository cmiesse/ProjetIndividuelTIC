package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.Ville;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.VilleMapper;
import be.cmiesse.tfStockAPI.models.dto.VilleDTO;
import be.cmiesse.tfStockAPI.repository.VilleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VilleService implements CrudService<VilleDTO, VilleDTO, Long>{
    private final VilleRepository repo;
    private final VilleMapper mapper;

    public VilleService(VilleRepository repo, VilleMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public VilleDTO getOne(Long id) throws ElementNotFoundException {
        return mapper.toDTO(repo.getOne(id));
    }

    @Override
    public List<VilleDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public VilleDTO insert(VilleDTO form) {
        if(form == null) throw new IllegalArgumentException();
        Ville saved = repo.save(mapper.toEntity(form));
        return mapper.toDTO(saved);
    }

    public void update(VilleDTO toUpdate,Long id) throws ElementNotFoundException {
        if(id==null || toUpdate == null) throw new IllegalArgumentException();
        Ville entity = repo.findById(id)
                .orElseThrow(()->new ElementNotFoundException(id));
        Ville ville = mapper.toEntity(toUpdate);
        entity.setName(ville.getName());
        entity.setNameNL(ville.getNameNL());
        entity.setLocationLink(ville.getLocationLink());
        repo.save(entity);
    }

    @Override
    public void delete(Long id) throws ElementNotFoundException {
        if (id==null) throw new ElementNotFoundException(id);
        repo.deleteById(id);
    }
}
