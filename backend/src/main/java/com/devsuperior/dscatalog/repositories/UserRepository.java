package com.devsuperior.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.devsuperior.dscatalog.entities.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Long>{
      Optional<User> findByEmail(String email);
}
