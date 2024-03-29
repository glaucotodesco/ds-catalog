package com.devsuperior.dscatalog.services;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.dto.UriDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private S3Service s3Service;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPage(PageRequest pageRequest, Long categoryId, String name) {
		List<Category> categories = categoryId == 0 ? null : Arrays.asList(categoryRepository.getOne(categoryId));
		Page<Product> list = repository.find(categories, name, pageRequest);
		repository.find(list.toList());
		return list.map(p -> new ProductDTO(p, p.getCategories()));
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> op = repository.findById(id);
		Product entity = op
				.orElseThrow(() -> new EntityNotFoundException("Entity Not Found " + id));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		try {
			Product entity = new Product(dto);
			copyDtoToEntity(dto, entity);

			if(entity.getCategories().size() == 0){
				entity.getCategories().add(categoryRepository.getOne(1L));
			}

			entity = repository.save(entity);
			return new ProductDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("Entity Not Found");
		}
	
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			
			if(entity.getCategories().size() == 0){
				entity.getCategories().add(categoryRepository.getOne(1L));
			}
			
			entity = repository.save(entity);
			return new ProductDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("Entity Not Found " + id);
		}
	
	}

	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		entity.setDate(dto.getDate());
		entity.setDescription(dto.getDescription());
		entity.setImgUrl(dto.getImgUrl());
		entity.setName(dto.getName());
		entity.setPrice(dto.getPrice());

		entity.getCategories().clear();


		//@formatter:off
		Set<Category> set = dto.getCategories().stream()
											   .map(p -> categoryRepository.getOne(p.getId()))
											   .collect(Collectors.toSet());
		 entity.getCategories().addAll(set);
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

	public UriDTO uploadFile(MultipartFile file) {
		URL url = s3Service.uploadFile(file);
		return new UriDTO(url.toString());
	}

}
