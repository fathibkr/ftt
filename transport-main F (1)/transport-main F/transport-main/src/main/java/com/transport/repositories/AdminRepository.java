package com.transport.repositories;

import com.transport.enteties.Admin;
import com.transport.enteties.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends  JpaRepository<Admin,Long>{

}
