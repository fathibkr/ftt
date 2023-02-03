package com.transport.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.transport.dto.ContactDto;
import com.transport.enteties.*;
import com.transport.services.EmailNoteService;
import com.transport.services.FileStorageService;
import com.transport.services.JwtUtil;
import com.transport.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    EmailNoteService emailNoteService;
    @Autowired
    FileStorageService fileStorageService;
    @Autowired
    JwtUtil jwtUtil;


    @PostMapping("/admin")
    @ResponseBody
    public Admin addUser(@RequestPart(value = "user") String userRequest,
                         @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Admin user = new ObjectMapper().readValue(userRequest, Admin.class);

        FileDB image = fileStorageService.store(file);
        user.setImage(image);

        return userService.addAdmin(user);
    }
    @PostMapping("/client")
    @ResponseBody
    public Client addClient(@RequestPart(value = "user") String userRequest,
                              @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Client user = new ObjectMapper().readValue(userRequest, Client.class);

        FileDB image = fileStorageService.store(file);
        user.setImage(image);

        return userService.addClient(user);
    }
    @PostMapping("/chauffeur")
    @ResponseBody
    public Chauffeur updateUserChauff(@RequestPart(value = "user") String userRequest,
                               @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Chauffeur user = new ObjectMapper().readValue(userRequest, Chauffeur.class);

        FileDB image = fileStorageService.store(file);
        user.setImage(image);

        return userService.addChauffeur(user);
    }
    @PutMapping
    public Admin updateUser(@RequestPart(value = "user") String users,
                              @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Admin user = new ObjectMapper().readValue(users, Admin.class);
        FileDB image = fileStorageService.store(file);
        user.setImage(image);
        return  userService.addAdmin(user);
    }
    @PutMapping("/chauffeur")
    public Chauffeur updateUserC(@RequestPart(value = "user") String users,
                                 @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Chauffeur user = new ObjectMapper().readValue(users, Chauffeur.class);
        FileDB image = fileStorageService.store(file);
        user.setImage(image);
        return  userService.addChauffeur(user);
    }
    @PutMapping("/client")
    public Client updateUserCl(@RequestPart(value = "user") String users,
                               @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Client user = new ObjectMapper().readValue(users, Client.class);
        FileDB image = fileStorageService.store(file);
        user.setImage(image);
        return  userService.addClient(user);
    }




    @PostMapping("/add")
    public UserEntity addUserWithoutImage(@RequestBody UserEntity user)  {
        return userService.addUser(user);
    }

    @PutMapping("/update")
    public UserEntity updateUserWithoutImage(@RequestBody UserEntity userDto) {
        return userService.updateUser(userDto);
    }

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/chauffeur/all")
    public List<Chauffeur> getAllChauffeur() {
        return userService.getAllChauffer();
    }
    @GetMapping("/client/all")
    public List<Client> getAllClient() {
        return userService.getAllClient();
    }
    @GetMapping("/client/total")
    public long getTotalClient() {
        return userService.getTotalClient() ;
    }
    @GetMapping("/chauffeur/total")
    public long getTotalChauffeur() {
        return userService.getTotalChauffeur() ;
    }
    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable(name = "id") int id) {
        return userService.getUserById(id);
    }
    @GetMapping("/active/{id}")
    public void getactive(@PathVariable(name = "id") int id) throws MessagingException {
        UserEntity user = userService.getUserById(id);
        if (user.getIs_active() == 0){
            user.setIs_active(1);
            emailNoteService.Accepter(user.getEmail(),"votre demande a éte accepter visitez votre espace",user.getFirstName()+" "+user.getLastName());
        }
        else { user.setIs_active(0);
            emailNoteService.desactiver(user.getEmail(),"votre demande a éte desactiver",user.getFirstName()+" "+user.getLastName());

        }
        userService.updateUser(user);
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable(name = "id") int id) {
        userService.deleteUser(id);
    }

    @PostMapping(path = "/contact")
    public void contact(@RequestBody ContactDto contactDto ){
        emailNoteService.contact(contactDto);

    }

}
