package com.devsuperior.dscatalog.resources.exceptions;

import java.io.Serializable;

public class FieldError implements Serializable{

    private static final long serialVersionUID = 1L;

    private String fieldName;
    private String message;

    public FieldError(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    public FieldError(){

    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    
    
}
