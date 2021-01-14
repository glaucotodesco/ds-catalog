package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
		@Transactional(readOnly = true)
		public List<CategoryDTO> findAll(){
			List<Category> list = categoryRepository.findAll();
			return list.stream().map(c -> new CategoryDTO(c)).collect(Collectors.toList());
		}

		@Transactional(readOnly = true)
		public CategoryDTO findById(Long id) {
			Optional<Category> op = categoryRepository.findById(id);
			Category category = op.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Entity not found"));
			return new CategoryDTO(category);
		}

		@Transactional
		public CategoryDTO insert(CategoryDTO categoryDTO) {
			Category entity = new Category(categoryDTO);
			entity = categoryRepository.save(entity);
			return new CategoryDTO(entity);
		}

		@Transactional
		public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
			try {
				Category entity = categoryRepository.getOne(id);
				entity.setName(categoryDTO.getName());
				return new CategoryDTO(entity);
			}
			catch(EntityNotFoundException e) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Id not found " + id);
			}
		}

		
		public void delete(Long id) {
			try {
				categoryRepository.deleteById(id);
			}
			catch(EmptyResultDataAccessException e) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Id not found " + id); 
			}
			catch(DataIntegrityViolationException e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Integrity violation");
			}
			
			
		}
}


