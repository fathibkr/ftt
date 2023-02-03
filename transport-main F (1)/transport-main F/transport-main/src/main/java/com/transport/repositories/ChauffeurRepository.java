package com.transport.repositories;

import com.transport.enteties.Chauffeur;
import com.transport.enteties.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChauffeurRepository extends  JpaRepository<Chauffeur,Long>{

}
