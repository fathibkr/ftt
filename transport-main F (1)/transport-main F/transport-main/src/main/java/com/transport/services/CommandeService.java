package com.transport.services;



import com.transport.enteties.*;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.mail.MessagingException;
import java.util.List;


public interface CommandeService  {


    Commande updateCommande(Commande commande) throws MessagingException;

    Commande getCommandeById(long id);


    List<Commande> getCommandeByClient(long id);

    List<Commande> getCommandeByStat(Stat stat);
    List<Commande> getCommandeByStatAndCarType(Stat stat, CarType car);

    List<Commande> getCommandeByChauffeur(long id);

    Commande addCommande(Commande commande);

   int getTotal();

    List<Commande> getAllCommandes();



    void deleteCommande(long id);


}
