package com.simple.websocket.server.serversample;

public class DataPayload {

    private String id;
    private String user;
    private String lastName;
    private String name;
    private String transaction;
    private String description;
    private String status;
    private String time;

    public DataPayload(String id, String user, String lastName, String name, String transaction, String description, String status, String time) {
        this.id = id;
        this.user = user;
        this.lastName = lastName;
        this.name = name;
        this.transaction = transaction;
        this.description = description;
        this.status = status;
        this.time = time;
    }

    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getTransaction() {
        return transaction;
    }
    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }

}



