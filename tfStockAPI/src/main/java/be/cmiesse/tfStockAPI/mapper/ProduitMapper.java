package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.Produit;
import be.cmiesse.tfStockAPI.models.dto.ProduitDTO;
import be.cmiesse.tfStockAPI.models.form.ProduitForm;
import be.cmiesse.tfStockAPI.repository.TypeRepository;
import org.springframework.stereotype.Component;

@Component
public class ProduitMapper {
    private final TypeRepository tRepo;
    private final TypeMapper tMapper;

    public ProduitMapper(TypeRepository tRepo, TypeMapper tMapper) {
        this.tRepo = tRepo;
        this.tMapper = tMapper;
    }

    public Produit formToEntity(ProduitForm form){
        if(form==null) return null;
        return Produit.builder()
                .name(form.getName())
                .link(form.getLink())
                .type(tRepo.getOne(form.getType()))
                .build();
    }

    public ProduitDTO toDTO(Produit produit){
        if(produit==null) return null;
        return ProduitDTO.builder()
                .id(produit.getId())
                .name(produit.getName())
                .link(produit.getLink())
                .type(tMapper.toDTO(produit.getType()))
                .build();
    }
}
