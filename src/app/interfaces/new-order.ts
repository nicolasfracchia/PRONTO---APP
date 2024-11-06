export interface OrderProductPrice {
    productPriceId:number,
    quantity:number
}

export interface NewOrder {
    forDate:string,
    forTime:string,
    points:number,
    productPrices: OrderProductPrice[]
}