package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.ProduitPrix;
import be.cmiesse.tfStockAPI.entity.ProduitPrixKey;
import be.cmiesse.tfStockAPI.exception.ElementAlreadyExistsException;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.ProduitPrixMapper;
import be.cmiesse.tfStockAPI.models.dto.ProduitPrixDTO;
import be.cmiesse.tfStockAPI.models.form.ProduitPrixForm;
import be.cmiesse.tfStockAPI.repository.ProduitPrixRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProduitPrixService implements CrudService<ProduitPrixDTO,ProduitPrixForm, ProduitPrixKey>{

    private final ProduitPrixRepository repo;
    private final ProduitPrixMapper mapper;

    public ProduitPrixService(ProduitPrixRepository repo, ProduitPrixMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Override
    public ProduitPrixDTO getOne(ProduitPrixKey id) throws ElementNotFoundException {
        ProduitPrix pp= repo.findById(id).orElseThrow(()->new ElementNotFoundException(id.getProductId()));
        return mapper.toDTO(pp);
    }

    @Override
    public List<ProduitPrixDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public ProduitPrixDTO insert(ProduitPrixForm form) throws ElementAlreadyExistsException {
        if(form==null) throw new IllegalArgumentException();
        if(repo.existsById(ProduitPrixKey.builder()
                .productId(form.getProduct())
                .shopId(form.getShop())
                .build())) throw new ElementAlreadyExistsException();
        ProduitPrix saved = repo.save(mapper.formToEntity(form));
        return mapper.toDTO(saved);
    }

    public void update(ProduitPrixForm toUpdate, ProduitPrixKey id) throws ElementNotFoundException{
        if(id == null || toUpdate == null) throw new IllegalArgumentException();
        ProduitPrix pp = repo.findById(id)
                .orElseThrow(()->new ElementNotFoundException(id.getProductId()));
        ProduitPrix pPrix = mapper.formToEntity(toUpdate);
        pp.setPrice(pPrix.getPrice());
        repo.save(pp);
    }

    @Override
    public void delete(ProduitPrixKey id) throws ElementNotFoundException {
        if(id==null) throw new ElementNotFoundException(id.getProductId());
        repo.deleteById(id);
    }
}
