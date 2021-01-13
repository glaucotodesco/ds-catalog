package com.devsuperior.dscatalog.entities;

import java.io.Serializable;

public class Category implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long idLong;
	private String name;
	
	public Category() {
		
	}

	public Category(Long idLong, String name) {
		super();
		this.idLong = idLong;
		this.name = name;
	}

	public Long getIdLong() {
		return idLong;
	}

	public void setIdLong(Long idLong) {
		this.idLong = idLong;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Category [idLong=" + idLong + ", name=" + name + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idLong == null) ? 0 : idLong.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		if (idLong == null) {
			if (other.idLong != null)
				return false;
		} else if (!idLong.equals(other.idLong))
			return false;
		return true;
	}
	
}
