package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.Ville;
import be.cmiesse.tfStockAPI.models.dto.VilleDTO;
import org.springframework.stereotype.Component;

@Component
public class VilleMapper {

    public Ville toEntity(VilleDTO dto){
        if(dto == null) return null;
        return Ville.builder()
                .postalCode(dto.getPostalCode())
                .name(dto.getName())
                .nameNL(dto.getNameNL())
                .locationLink(dto.getLocationLink())
                .build();
    }

    public VilleDTO toDTO(Ville ville){
        if(ville == null) return null;
        return VilleDTO.builder()
                .postalCode(ville.getPostalCode())
                .name(ville.getName())
                .nameNL(ville.getNameNL())
                .locationLink(ville.getLocationLink())
                .build();
    }

}
