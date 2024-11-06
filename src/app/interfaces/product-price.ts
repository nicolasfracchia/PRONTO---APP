import { Section } from "./section";

export interface ProductPrice {
    id:number,
    concept: string,
    price: number,
    Section?: Section
}
