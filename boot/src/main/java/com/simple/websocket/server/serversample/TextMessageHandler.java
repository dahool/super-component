package com.simple.websocket.server.serversample;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;

@Component
public class TextMessageHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        final Gson gson = new Gson();
        gson.fromJson(message.getPayload(), RequestPayload.class);
        // do nothing yet
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        final Gson gson = new Gson();

        final List<DataPayload> list = new ArrayList<>();
        list.add(new DataPayload("1", "user1", "lastName1", "name1", "tx1", "description1", "Pendiente", "0"));
        final AtomicInteger value = new AtomicInteger(1);

        session.sendMessage(new TextMessage(gson.toJson(list)));

       
        // start timer and keep sending updates
        final TimerTask task = new TimerTask() {
            public void run() {
                int ind = value.incrementAndGet();
                list.add(new DataPayload(Integer.toString(ind), "user" + ind, "lastName" + ind, "name" + ind, "tx" + ind, "description" + ind, "Pendiente", "0"));
                try {
                    System.out.println("Send " + ind);
                    session.sendMessage(new TextMessage(gson.toJson(list)));
                } catch (Exception e) {
                    //
                }
                
            }
        };
        new Timer("Timer").schedule(task, 1000, 5000);
    }
    
}
