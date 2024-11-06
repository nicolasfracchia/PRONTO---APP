import { ProductPrice } from "./product-price";

export interface ProductsFromSections {
    id: number,
    name: string,
    image: string,
    order: number,
    category: string,
    prices: ProductPrice[]
}
