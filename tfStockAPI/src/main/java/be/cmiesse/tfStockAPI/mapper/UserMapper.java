package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.User;
import be.cmiesse.tfStockAPI.models.dto.UserDTO;
import be.cmiesse.tfStockAPI.models.form.UserForm;
import be.cmiesse.tfStockAPI.repository.ProduitRepository;
import be.cmiesse.tfStockAPI.repository.TypeRepository;
import be.cmiesse.tfStockAPI.repository.VilleRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    private final VilleRepository vRepo;
    private final VilleMapper vMapper;
    private final TypeRepository tRepo;
    private final TypeMapper tMapper;
    private final ProduitRepository pRepo;
    private final ProduitMapper pMapper;

    public UserMapper(VilleRepository vRepo, VilleMapper vMapper, TypeRepository tRepo, TypeMapper tMapper, ProduitRepository pRepo, ProduitMapper pMapper) {
        this.vRepo = vRepo;
        this.vMapper = vMapper;
        this.tRepo = tRepo;
        this.tMapper = tMapper;
        this.pRepo = pRepo;
        this.pMapper = pMapper;
    }

    public User formToEntity(UserForm form){
        if(form == null) return null;
        return User.builder()
                .username(form.getUsername())
                .password(form.getPassword())
                .firstName(form.getFirstName())
                .lastName(form.getLastName())
                .email(form.getEmail())
                .city(vRepo.getOne(form.getCity()))
                .createdAt(LocalDate.now())
                .roles(form.getRoles())
                .credentialsNonExpired(true)
                .enabled(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .chosenTypes(form.getChosenTypes().stream().map(tRepo::getOne).collect(Collectors.toList()))
                .chosenProducts(form.getChosenProducts().stream().map(pRepo::getOne).collect(Collectors.toList()))
                .build();
    }

    public UserDTO toDTO(User user){
        if(user == null) return null;
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .city(vMapper.toDTO(user.getCity()))
                .createdAt(user.getCreatedAt())
                .roles(user.getRoles())
                .chosenTypes(user.getChosenTypes().stream().map(tMapper::toDTO).collect(Collectors.toList()))
                .chosenProducts(user.getChosenProducts().stream().map(pMapper::toDTO).collect(Collectors.toList()))
                .build();
    }
}
