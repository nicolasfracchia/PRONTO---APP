import { OrderStatus } from "./order-status"
import { UserInfo } from "./user-info"

export interface OrderProduct {
    unitPrice:number,
    quantity:number,
    ProductPrice: {
        concept:string,
        price:number,
        Product: {
            name:string,
            Category: {
                name:string
            }
        },
        Section: {
            name:string
        }
    }
}

export interface Order {
    id:number,
    createdAt:string,
    updatedAt:string,
    forDate:string,
    forTime:string,
    total:number,
    points:number,
    OrdersStatus:OrderStatus,
    User: UserInfo,
    OrdersProducts:OrderProduct[]

}