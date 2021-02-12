package com.devsuperior.dscatalog.services;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.entities.Role;
import com.devsuperior.dscatalog.entities.User;
import com.devsuperior.dscatalog.repositories.RoleRepository;
import com.devsuperior.dscatalog.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

	
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;




	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPage(PageRequest pageRequest) {
		Page<User> list = repository.findAll(pageRequest);
		return list.map(u -> new UserDTO(u));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> op = repository.findById(id);
		User entity = op
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity User not found"));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		try {
			User entity = new User();
			copyDtoToEntity(dto, entity);
			entity.setPassword(encoder.encode(dto.getPassword()));
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	
	}

	@Transactional
	public UserDTO update(Long id, UserDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	
	}

	private void copyDtoToEntity(UserDTO dto, User entity) {
		
		entity.setEmail(dto.getEmail());
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.getRoles().clear();

		//@formatter:off
		Set<Role> set = dto.getRoles().stream()
									  .map(r -> roleRepository.getOne(r.getId()))
									  .collect(Collectors.toSet());
		 entity.getRoles().addAll(set);
		//@formatter:on		

	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Integrity violation");
		}
	}

}
