package com.devsuperior.dscatalog.services;

import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
		@Transactional(readOnly = true)
		public Page<ProductDTO> findAllPage(PageRequest pageRequest){
			Page<Product> list = productRepository.findAll(pageRequest);
			return list.map(c -> new ProductDTO(c));
		}

		@Transactional(readOnly = true)
		public ProductDTO findById(Long id) {
			Optional<Product> op = productRepository.findById(id);
			Product product = op.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Entity Product not found"));
			return new ProductDTO(product, product.getCategories());
		}

		@Transactional
		public ProductDTO insert(ProductDTO productDTO) {
			Product entity = new Product(productDTO);
			entity = productRepository.save(entity);
			return new ProductDTO(entity);
		}

		@Transactional
		public ProductDTO update(Long id, ProductDTO productDTO) {
			try {
				Product entity = productRepository.getOne(id);
				entity.setName(productDTO.getName());
				return new ProductDTO(entity);
			}
			catch(EntityNotFoundException e) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Id not found " + id);
			}
		}

		
		public void delete(Long id) {
			try {
				productRepository.deleteById(id);
			}
			catch(EmptyResultDataAccessException e) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Id not found " + id); 
			}
			catch(DataIntegrityViolationException e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Integrity violation");
			}
			
			
		}
}


