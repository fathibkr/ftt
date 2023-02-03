package com.transport.services;

import com.transport.enteties.*;
import com.transport.repositories.CommandeRepository;
import com.transport.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;

import static com.transport.enteties.Stat.EN_COURS;

@Service
public class CommandeServiceImp implements CommandeService {
    @Autowired
    CommandeRepository commandeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailNoteService emailNoteService;
    @Override
    public Commande updateCommande(Commande commande) throws MessagingException {
       if(commande.getStat().equals(EN_COURS)){
            emailNoteService.notificationemail(commande.getClient().getEmail(),
                    "a été acceptée par un de nos chauffeurs ",
                    commande.getClient().getFirstName()+" "+commande.getClient().getLastName(),
                    commande.getChauffeur().getFirstName()+" "+commande.getChauffeur().getLastName()+" Vous pouvez le contacter au numéro suivant pour plus de détails " +commande.getChauffeur().getMobile(),
                    "<br> Sont facture est : <br> de " +commande.getDepart()+" <br> à "+commande.getArrive()+" <br> de type "+commande.getCarType()+" et de  "+commande.getNumberPersons()+" Manutentionnaire <br> à partire de  "+commande.getDateDepart()+" <br>  <br> sont prix total est  "+commande.getPrice(),
                    "Commande");
        }
        return commandeRepository.save(commande);

    }

    @Override
    public Commande getCommandeById(long id) {
        return commandeRepository.findById(id).get();
    }
    @Override
    public List<Commande> getCommandeByClient(long id) {
       UserEntity user= userRepository.findById(id).get();
        return commandeRepository.findByClient((Client) user);
    }
    @Override
    public List<Commande> getCommandeByStat(Stat stat) {
        return commandeRepository.findByStat(stat);
    }
    @Override
    public List<Commande> getCommandeByStatAndCarType(Stat stat, CarType car) {
        return commandeRepository.findByStatAndCarType(stat, car);
    }
    @Override
    public List<Commande> getCommandeByChauffeur(long id) {
        UserEntity user= userRepository.findById(id).get();
        return commandeRepository.findByChauffeur((Chauffeur) user);
    }
    @Override
    public Commande addCommande(Commande commande) {

        commande.setStat(Stat.EN_ATTENTE);
        return commandeRepository.save(commande);
    }

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }
    @Override
    public int getTotal() {
        return commandeRepository.getTotal();
    }
    @Override
    public void deleteCommande(long id) {
        commandeRepository.deleteById(id);
    }
}
