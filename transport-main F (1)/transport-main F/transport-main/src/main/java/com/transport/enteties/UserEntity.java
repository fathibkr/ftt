package com.transport.enteties;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private FileDB image;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private int is_active;

    @Transient
    @JsonIgnore
    public String getDiscriminatorColumnValue() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }

}


