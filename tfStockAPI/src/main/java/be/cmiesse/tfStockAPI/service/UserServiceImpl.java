package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.entity.User;
import be.cmiesse.tfStockAPI.exception.CustomException;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;
import be.cmiesse.tfStockAPI.mapper.UserMapper;
import be.cmiesse.tfStockAPI.models.dto.UserDTO;
import be.cmiesse.tfStockAPI.models.form.ChangePasswordForm;
import be.cmiesse.tfStockAPI.models.form.UpdateUserForm;
import be.cmiesse.tfStockAPI.models.form.UserForm;
import be.cmiesse.tfStockAPI.repository.UserRepository;
import be.cmiesse.tfStockAPI.security.jwt_support.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository repo;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authManager;

    public UserServiceImpl(UserRepository repo, UserMapper mapper, PasswordEncoder encoder, JwtTokenProvider tokenProvider, AuthenticationManager authManager) {
        this.repo = repo;
        this.mapper = mapper;
        this.encoder = encoder;
        this.tokenProvider = tokenProvider;
        this.authManager = authManager;
    }

    @Override
    public UserDTO insert(UserForm form) {
        if(repo.existsByUsername(form.getUsername()))
            throw new CustomException("username déjà pris", HttpStatus.UNPROCESSABLE_ENTITY);
        User toInsert = mapper.formToEntity(form);
        toInsert.setPassword(encoder.encode(toInsert.getPassword()));
        return mapper.toDTO(repo.save(toInsert));

    }

    @Override
    public UserDTO signIn(UserForm form) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(form.getUsername(), form.getPassword()));
            UserDTO user = mapper.toDTO(repo.findByUsername(form.getUsername()).orElseThrow());
            user.setToken(tokenProvider.createToken(user.getUsername(), user.getRoles()));
            return user;
        } catch(AuthenticationException ex){
            throw new CustomException("Username/Password invalide(s)",HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Override
    public UserDTO signUp(UserForm form) {
        form.setRoles(Collections.singletonList("ROLE_USER"));
        UserDTO dto = insert(form);
        dto.setToken(tokenProvider.createToken(dto.getUsername(), dto.getRoles()));
        return dto;
    }

    @Override
    public List<UserDTO> getAll() {
        return repo.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO changePassword(ChangePasswordForm form) throws ElementNotFoundException {
       User entity = repo.findById(form.getUser()).orElseThrow(()->new ElementNotFoundException(form.getUser()));
       String original = entity.getPassword();
        if(!encoder.matches(form.getOldPwd(),original ))
            throw new CustomException("Mauvais mot de passe",HttpStatus.FORBIDDEN);
        if(!form.getNewPwd().equals(form.getConfirmation()))
            throw new CustomException("Le nouveau mot de passe et sa confirmation ne correspondent pas",HttpStatus.BAD_REQUEST);
        entity.setPassword(encoder.encode(form.getNewPwd()));
        repo.save(entity);
        return mapper.toDTO(entity);
    }

    @Override
    public UserDTO update(UpdateUserForm form, Long id) throws ElementNotFoundException {
        User entity = repo.findById(id).orElseThrow(()->new ElementNotFoundException(id));
        UserForm reconstruct = UserForm.builder()
                .username(entity.getUsername())
                .password(entity.getPassword())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .email(form.getEmail())
                .city(form.getCity())
                .roles(entity.getRoles())
                .chosenTypes(form.getChosenTypes())
                .chosenProducts(form.getChosenProducts())
                .build();
        return mapper.toDTO(repo.save(mapper.formToEntity(reconstruct)));
    }

    @Override
    public UserDTO delete(Long id) throws ElementNotFoundException {
        if(id== null) throw new IllegalArgumentException();
        if(!repo.existsById(id)) throw new ElementNotFoundException(id);
        User toDelete = repo.getOne(id);
        repo.deleteById(id);
        return mapper.toDTO(toDelete);
    }
}
