export type TOrderStatus =  'canceled' | 'pending' | 'confirmed' | 'delivered';
export type TOrderDeliveryDate = 'asap' | 'within1day' |  'within2day' | string

export interface IOrder {
    id: string
    phone1: string
    phone2?: string
    region?: string
    address?: string
    apartment?: string
    floor?: string
    entry?: string
    deliveryDate: TOrderDeliveryDate
    status:TOrderStatus
}