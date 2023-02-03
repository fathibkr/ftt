package com.transport.services;


import com.transport.enteties.Admin;
import com.transport.enteties.Chauffeur;
import com.transport.enteties.Client;
import com.transport.enteties.UserEntity;
import com.transport.repositories.AdminRepository;
import com.transport.repositories.ChauffeurRepository;
import com.transport.repositories.ClientRepository;
import com.transport.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImp implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    ChauffeurRepository chauffeurRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserEntity addUser(UserEntity user) {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);

    }

    @Override
    public Client addClient(Client user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return clientRepository.save(user);
    }
    @Override
    public Chauffeur addChauffeur(Chauffeur user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return chauffeurRepository.save(user);
    }
    @Override
    public Admin addAdmin(Admin user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return adminRepository.save(user);
    }

    @Override
    public UserEntity updateUserChauff(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Client> getAllClient() {
        return clientRepository.findAll();
    }
    @Override
    public long getTotalClient() {
        return clientRepository.count();
    }
    @Override
    public List<Chauffeur> getAllChauffer() {
        return chauffeurRepository.findAll();
    }

    public long getTotalChauffeur() {
        return chauffeurRepository.count();
    }
    @Override
    public UserEntity updateUser(UserEntity user) {

        return userRepository.save(user);
    }



    @Override
    public UserEntity getUserById(int id) {

        return userRepository.findById((long) id).get();


    }



    @Override
    public void deleteUser(int id) {
        userRepository.deleteById((long) id);

    }

    @Override
    public UserEntity getUserByEmail(String email) {
      return   userRepository.findByEmail(email);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email);

        if (user == null) throw new UsernameNotFoundException(email);

        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

}
