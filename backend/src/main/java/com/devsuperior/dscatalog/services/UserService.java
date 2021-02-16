package com.devsuperior.dscatalog.services;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.dto.UserUpdateDTO;
import com.devsuperior.dscatalog.entities.Role;
import com.devsuperior.dscatalog.entities.User;
import com.devsuperior.dscatalog.repositories.RoleRepository;
import com.devsuperior.dscatalog.repositories.UserRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.EntityNotFoundException;

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
				.orElseThrow(() -> new EntityNotFoundException("Entity Not Found " + id));
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
			throw new EntityNotFoundException("Entity Not Found ");
		}
	
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("Entity Not Found " + id);
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
			throw new EntityNotFoundException("Entity Not Found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}

}
