package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.Type;
import be.cmiesse.tfStockAPI.models.dto.TypeDTO;
import be.cmiesse.tfStockAPI.models.form.TypeForm;
import org.springframework.stereotype.Component;

@Component
public class TypeMapper {

    public Type formToEntity(TypeForm form){
        if(form==null) return null;
        return Type.builder()
                .name(form.getName())
                .build();
    }

    public TypeDTO toDTO(Type type){
        if(type==null) return null;
        return TypeDTO.builder()
                .id(type.getId())
                .name(type.getName())
                .build();
    }

}
