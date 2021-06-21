package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.Magasin;
import be.cmiesse.tfStockAPI.models.dto.MagasinDTO;
import be.cmiesse.tfStockAPI.models.form.MagasinForm;
import be.cmiesse.tfStockAPI.repository.VilleRepository;
import org.springframework.stereotype.Component;

@Component
public class MagasinMapper {

    private final VilleRepository vRepo;
    private final VilleMapper vMapper;

    public MagasinMapper(VilleRepository vRepo, VilleMapper vMapper) {
        this.vRepo = vRepo;
        this.vMapper = vMapper;
    }

    public Magasin formToEntity(MagasinForm form){
        if(form==null) return null;
        return Magasin.builder()
                .name(form.getName())
                .street(form.getStreet())
                .number(form.getNumber())
                .city(vRepo.getOne(form.getCity()))
                .locationLink(form.getLocationLink())
                .build();
    }

    public MagasinDTO toDTO(Magasin magasin){
        if(magasin==null) return null;
        return MagasinDTO.builder()
                .id(magasin.getId())
                .name(magasin.getName())
                .street(magasin.getStreet())
                .number(magasin.getNumber())
                .city(vMapper.toDTO(magasin.getCity()))
                .locationLink(magasin.getLocationLink())
                .build();
    }
}
