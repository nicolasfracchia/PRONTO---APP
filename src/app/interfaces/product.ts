import { Category } from "./category";
import { ProductPrice } from "./product-price";

export interface Product {
    id:number,
    name: string,
    image: string,
    Category: Category,
    ProductPrices?: ProductPrice[]
}
