package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.Annonce;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.AnnonceMapper;
import be.cmiesse.tfStockAPI.models.dto.AnnonceDTO;
import be.cmiesse.tfStockAPI.models.form.AnnonceForm;
import be.cmiesse.tfStockAPI.repository.AnnonceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnnonceService implements CrudService<AnnonceDTO, AnnonceForm,Long>{
    private final AnnonceRepository repo;
    private final AnnonceMapper mapper;

    public AnnonceService(AnnonceRepository repo, AnnonceMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public AnnonceDTO getOne(Long id) throws ElementNotFoundException {
        return mapper.toDTO(repo.getOne(id));
    }

    @Override
    public List<AnnonceDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public AnnonceDTO insert(AnnonceForm form) {
        if(form == null) throw new IllegalArgumentException();
        Annonce saved = repo.save(mapper.formToEntity(form));
        return mapper.toDTO(saved);
    }

    @Override
    public void delete(Long id) throws ElementNotFoundException {
        if (id==null) throw new ElementNotFoundException(id);
        repo.deleteById(id);
    }
}
