import { ImageSourcePropType } from "react-native"

export type ProductsResponse  = {
    content: Product[];
    totalPages: number;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
   
   
}

export type Category = {
    id: number;
    name: string;
}