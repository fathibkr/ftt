package com.transport.services;

import com.transport.dto.ContactDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailNoteServiceImpl implements EmailNoteService {
    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void notificationemail(String to, String message,String recepName,String chauffName, String Facturation, String object) throws MessagingException {
        MimeMessage notification = mailSender.createMimeMessage();
        MimeMessageHelper email = new MimeMessageHelper(notification);
        try {
            email.setFrom("vtransport49@gmail.com");
            email.setTo(to);
            email.setSubject(object);
            String text=
                    "<p>Cher Client "+recepName+" :</p> <p> Votre "+object+"</p><br>"

                            + message
                            +chauffName
                            + "<br>"
                            + Facturation
                            + "<br>"
                            + "Merci de ne pas repondre à cet mail." + "<br>Cordialement.</p>";
            email.setText(text,true);
        } catch (MessagingException e) {
            e.printStackTrace();

        }

        mailSender.send(notification);

    }

    @Override
    public void contact(ContactDto contactDto) {
        MimeMessage notification = mailSender.createMimeMessage();
        MimeMessageHelper email = new MimeMessageHelper(notification);
        try {
            email.setFrom("vtransport49@gmail.com");
            email.setTo("vtransport49@gmail.com");
            email.setSubject("contact");
            String text=
                    "<p> Vous avez reçu un nouveau message.</p> <br> Voici les détails <br> Nom :  "+contactDto.getNom() +"<br> Email : "+contactDto.getEmail()+"<br>telephone : "+contactDto.getTel()+"<br>Sujet : "+contactDto.getMsg();
            email.setText(text,true);
        } catch (MessagingException e) {
            e.printStackTrace();

        }

        mailSender.send(notification);

    }
    @Override
    public void Accepter(String to, String message, String recepName) throws MessagingException {
        MimeMessage notification = mailSender.createMimeMessage();
        MimeMessageHelper email = new MimeMessageHelper(notification);
        try {
            email.setFrom("vtransport49@gmail.com");
            email.setTo(to);
            email.setSubject("Notification ");
            String text=
                    "<p>Monsieur "+recepName+" :</p> <br> "+ message+"<br>"
                            + "Merci de ne pas repondre à cet mail." + "<br>Cordialement.</p>";
            email.setText(text,true);
        } catch (MessagingException e) {
            e.printStackTrace();

        }

        mailSender.send(notification);

    }

    @Override
    public void desactiver(String to, String message, String recepName) throws MessagingException {
        MimeMessage notification = mailSender.createMimeMessage();
        MimeMessageHelper email = new MimeMessageHelper(notification);
        try {
            email.setFrom("vtransport49@gmail.com");
            email.setTo(to);
            email.setSubject("Notification ");
            String text=
                    "<p>Monsieur "+recepName+" :</p> <br> "+ message+"<br>"
                            + "Merci de ne pas repondre à cet mail." + "<br>Cordialement.</p>";
            email.setText(text,true);
        } catch (MessagingException e) {
            e.printStackTrace();

        }

        mailSender.send(notification);

    }

}
