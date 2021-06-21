package be.cmiesse.tfStockAPI.exception;

public class ElementNotFoundException extends Exception{
    public ElementNotFoundException(int id) {
        super("L'élément ["+id+"] n'a pas été trouvé");
    }
    public ElementNotFoundException(Long id) {
        super("L'élément ["+id+"] n'a pas été trouvé");
    }
}
