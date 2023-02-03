package com.transport.enteties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String depart;
    private String arrive;
    private CarType carType;
    private int numberPersons;
    private Date dateDepart;
    private float price;
    private  float distance;
    private Stat stat;
    @ManyToOne
    private Chauffeur chauffeur;
    @ManyToOne
    private Client client;

}
