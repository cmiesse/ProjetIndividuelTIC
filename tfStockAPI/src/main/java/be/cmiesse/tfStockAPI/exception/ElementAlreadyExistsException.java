package be.cmiesse.tfStockAPI.exception;

public class ElementAlreadyExistsException extends Exception{
    public ElementAlreadyExistsException() {
        super("L'élément existe déjà");
    }
}
