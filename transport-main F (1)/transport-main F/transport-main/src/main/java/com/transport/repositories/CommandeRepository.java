package com.transport.repositories;

import com.transport.enteties.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeRepository extends  JpaRepository<Commande,Long>{

 List<Commande>  findByClient(Client client);

 List<Commande>  findByChauffeur(Chauffeur chauffeur);

 List<Commande>  findByStat(Stat stat);
 @Query("SELECT count (id) FROM Commande  ")
 int getTotal();
 List<Commande> findByStatAndCarType(Stat stat, CarType car);
}
