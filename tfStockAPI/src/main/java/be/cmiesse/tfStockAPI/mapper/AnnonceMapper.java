package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.Annonce;
import be.cmiesse.tfStockAPI.models.dto.AnnonceDTO;
import be.cmiesse.tfStockAPI.models.form.AnnonceForm;
import be.cmiesse.tfStockAPI.repository.MagasinRepository;
import be.cmiesse.tfStockAPI.repository.ProduitRepository;
import be.cmiesse.tfStockAPI.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AnnonceMapper {
    private final ProduitRepository pRepo;
    private final UserRepository uRepo;
    private final MagasinRepository mRepo;

    private final ProduitMapper pMapper;
    private final UserMapper uMapper;
    private final MagasinMapper mMapper;

    public AnnonceMapper(ProduitRepository pRepo, UserRepository uRepo, MagasinRepository mRepo, ProduitMapper pMapper, UserMapper uMapper, MagasinMapper mMapper) {
        this.pRepo = pRepo;
        this.uRepo = uRepo;
        this.mRepo = mRepo;
        this.pMapper = pMapper;
        this.uMapper = uMapper;
        this.mMapper = mMapper;
    }

    public Annonce formToEntity(AnnonceForm form){
        if(form == null) return null;
        return Annonce.builder()
                .quantity(form.getQuantity())
                .product(pRepo.getOne(form.getProduct()))
                .user(uRepo.getOne(form.getUser()))
                .shop(mRepo.getOne(form.getShop()))
                .createdAt(LocalDateTime.now())
                .build();
    }

    public AnnonceDTO toDTO(Annonce annonce){
        if(annonce==null) return null;
        return AnnonceDTO.builder()
                .id(annonce.getId())
                .quantity(annonce.getQuantity())
                .product(pMapper.toDTO(annonce.getProduct()))
                .user(uMapper.toDTO(annonce.getUser()))
                .shop(mMapper.toDTO(annonce.getShop()))
                .createdAt(annonce.getCreatedAt())
                .build();
    }
}
