package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.ProduitPrix;
import be.cmiesse.tfStockAPI.entity.ProduitPrixKey;
import be.cmiesse.tfStockAPI.models.dto.ProduitPrixDTO;
import be.cmiesse.tfStockAPI.models.form.ProduitPrixForm;
import be.cmiesse.tfStockAPI.repository.MagasinRepository;
import be.cmiesse.tfStockAPI.repository.ProduitRepository;
import org.springframework.stereotype.Component;

@Component
public class ProduitPrixMapper {
    private final ProduitRepository pRepo;
    private final MagasinRepository mRepo;

    private final ProduitMapper pMapper;
    private final MagasinMapper mMapper;


    public ProduitPrixMapper(ProduitRepository pRepo, MagasinRepository mRepo, ProduitMapper pMapper, MagasinMapper mMapper) {
        this.pRepo = pRepo;
        this.mRepo = mRepo;
        this.pMapper = pMapper;
        this.mMapper = mMapper;
    }

    public ProduitPrix formToEntity(ProduitPrixForm form){
        if(form== null) return null;
        return ProduitPrix.builder()
                .id(ProduitPrixKey.builder()
                        .productId(form.getProduct())
                        .shopId(form.getShop())
                        .build())
                .product(pRepo.getOne(form.getProduct()))
                .shop(mRepo.getOne(form.getShop()))
                .price(form.getPrice())
                .build();
    }

    public ProduitPrixDTO toDTO(ProduitPrix pP){
        if(pP == null) return null;
        return ProduitPrixDTO.builder()
                .product(pMapper.toDTO(pP.getProduct()))
                .shop(mMapper.toDTO(pP.getShop()))
                .price(pP.getPrice())
                .build();
    }
}
