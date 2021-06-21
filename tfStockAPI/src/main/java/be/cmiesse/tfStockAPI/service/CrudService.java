package be.cmiesse.tfStockAPI.service;

import be.cmiesse.tfStockAPI.exception.ElementAlreadyExistsException;
import be.cmiesse.tfStockAPI.exception.ElementNotFoundException;

import java.util.List;

public interface CrudService<DTO,FORM,ID> {

    DTO getOne(ID id) throws ElementNotFoundException;
    List<DTO> getAll();
    DTO insert(FORM form) throws ElementAlreadyExistsException;
    void delete(ID id) throws ElementNotFoundException;
}
