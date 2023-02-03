package com.transport.services;

import com.transport.dto.ContactDto;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
@Service
public interface EmailNoteService {
    void notificationemail(String to,String message,String recepName,String chauffName,String Facturation,String object) throws MessagingException;
    void contact(ContactDto contactDto);

    void Accepter(String to, String message, String recepName) throws MessagingException;

    void desactiver(String to, String message, String recepName) throws MessagingException;
}
