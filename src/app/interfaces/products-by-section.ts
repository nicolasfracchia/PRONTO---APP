import { ProductsFromSections } from "./products-from-sections"

export interface ProductsBySection {
    id:number,
    name: string,
    products: ProductsFromSections[]
}
