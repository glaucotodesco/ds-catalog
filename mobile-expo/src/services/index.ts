import axios from 'axios';
import { userToken } from './auth';

export const api = axios.create({
   baseURL: "https://nelio-dscatalog.herokuapp.com",
});

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";

export async function getProducts(){
   const res = await api.get(`/products?direction=DESC&orderBy=id`);
   return res;
}

export function getCategories() {
   const res = api.get(`/categories?direction=ASC&orderBy=name`);
   return res;
}


export async function createProduct(data: object) {
   const token = await userToken();
   
   const res = api.post('/products', data, {
      headers :{
         Authorization: `Bearer ${token}`
      }
   });

   return res;
   
}

