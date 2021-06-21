package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.Produit;
import be.cmiesse.tfStockAPI.entity.ProduitPrix;
import be.cmiesse.tfStockAPI.entity.ProduitPrixKey;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.ProduitMapper;
import be.cmiesse.tfStockAPI.models.dto.ProduitDTO;
import be.cmiesse.tfStockAPI.models.form.ProduitForm;
import be.cmiesse.tfStockAPI.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProduitService implements CrudService<ProduitDTO, ProduitForm, Long>{
    private final ProduitRepository repo;
    private final ProduitMapper mapper;

    public ProduitService(ProduitRepository repo, ProduitMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public ProduitDTO getOne(Long id) throws ElementNotFoundException {
        return mapper.toDTO(repo.getOne(id));
    }

    @Override
    public List<ProduitDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public ProduitDTO insert(ProduitForm form) {
        if(form == null) throw new IllegalArgumentException();
        Produit saved = repo.save(mapper.formToEntity(form));
        return mapper.toDTO(saved);
    }

    public void update(ProduitForm toUpdate, Long id) throws ElementNotFoundException{
        if(id==null || toUpdate == null) throw new IllegalArgumentException();
        Produit entity = repo.findById(id)
                .orElseThrow(()->new ElementNotFoundException(id));
        Produit pro = mapper.formToEntity(toUpdate);
        entity.setName(pro.getName());
        entity.setLink(pro.getLink());
        entity.setType(pro.getType());
        repo.save(entity);
    }

    @Override
    public void delete(Long id) throws ElementNotFoundException {
        if (id==null) throw new ElementNotFoundException(id);
        repo.deleteById(id);
    }
}
