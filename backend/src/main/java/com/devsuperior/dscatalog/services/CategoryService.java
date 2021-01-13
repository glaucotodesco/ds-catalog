package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
}


