package be.cmiesse.tfStockAPI.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException{

    private final HttpStatus httpStatus;

    public CustomException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
