package com.devsuperior.dscatalog.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long>{

    @Query("SELECT DISTINCT prods FROM Product prods "+ 
                  "INNER JOIN prods.categories cats "+ 
                  "WHERE (COALESCE(:categories) IS NULL OR cats IN :categories) AND "+
                  "      (LOWER(prods.name) LIKE LOWER(CONCAT('%',:name,'%')) )")
    Page<Product> find(List<Category> categories, String name, Pageable pageRequest);

    @Query("SELECT prods FROM Product prods JOIN FETCH prods.categories WHERE prods IN :products")
    List <Product> find(List<Product> products);


}
