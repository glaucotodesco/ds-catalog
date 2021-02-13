package com.devsuperior.dscatalog.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.EntityNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
		@Transactional(readOnly = true)
		public Page<CategoryDTO> findAllPage(PageRequest pageRequest){
			Page<Category> list = categoryRepository.findAll(pageRequest);
			return list.map(c -> new CategoryDTO(c));
		}

		@Transactional(readOnly = true)
		public CategoryDTO findById(Long id) {
			Optional<Category> op = categoryRepository.findById(id);
			Category category = op.orElseThrow(()-> new EntityNotFoundException("Entity Not Found " + id));
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
				throw new  EntityNotFoundException("Entity Not Found " + id);
			}
		}

		
		public void delete(Long id) {
			try {
				categoryRepository.deleteById(id);
			}
			catch(EmptyResultDataAccessException e) {
				throw new EntityNotFoundException("Entity Not Found " + id); 
			}
			catch(DataIntegrityViolationException e) {
				throw new DatabaseException("Integrity violation");
			}
			
			
		}
}


