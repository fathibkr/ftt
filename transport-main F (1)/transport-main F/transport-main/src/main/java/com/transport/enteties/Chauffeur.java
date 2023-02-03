package com.transport.enteties;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("chauffeur")
public class Chauffeur  extends UserEntity{
    private int mobile;
    private Date birthDay;
    private CarType carType;
    private String numFiscal;
    private String cnn;
    private String series;
    @OneToMany(mappedBy = "chauffeur")
    @JsonIgnore
    private List<Commande> commandes;


}
