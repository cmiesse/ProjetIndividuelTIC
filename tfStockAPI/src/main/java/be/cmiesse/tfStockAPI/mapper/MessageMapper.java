package be.cmiesse.tfStockAPI.mapper;

import be.cmiesse.tfStockAPI.entity.Message;
import be.cmiesse.tfStockAPI.models.dto.MessageDTO;
import be.cmiesse.tfStockAPI.models.form.MessageForm;
import be.cmiesse.tfStockAPI.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {
    private final UserRepository uRepo;
    private final UserMapper uMapper;

    public MessageMapper(UserRepository uRepo, UserMapper uMapper) {
        this.uRepo = uRepo;
        this.uMapper = uMapper;
    }

    public Message formToEntity(MessageForm form){
        if (form == null) return null;
        return Message.builder()
                .message(form.getMessage())
                .user(uRepo.getOne(form.getUser()))
                .done(false)
                .build();
    }

    public MessageDTO toDTO(Message message){
        if(message == null) return null;
        return MessageDTO.builder()
                .id(message.getId())
                .message(message.getMessage())
                .user(uMapper.toDTO(message.getUser()))
                .done(message.isDone())
                .build();
    }
}
