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
@DiscriminatorValue("client")
public class Client extends UserEntity {
    private int mobile;
    private Date birthDay;
    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private List<Commande> commandes;
}
