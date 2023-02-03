package com.transport.repositories;

import com.transport.enteties.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends  JpaRepository<UserEntity,Long> {


 @Transactional
 UserEntity findByEmail(String email);
 @Query("SELECT count (a.id) FROM UserEntity a where a.id = :id")
 UserEntity Active(int id);

}
