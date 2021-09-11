import axios from 'axios';

export const api = axios.create({
   baseURL: "https://nelio-dscatalog.herokuapp.com",
});

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";

export async function getProducts(){
   const res = await api.get(`/products`);
   return res;
}