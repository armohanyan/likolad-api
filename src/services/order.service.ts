import {IOrder, TOrderStatus} from '../types/order';
import {Order} from "../models";
import createHttpError from "http-errors";

export default class OrderService {
    static async getOrders(filter?: { status?: TOrderStatus }) {
        const {status } =  filter || {}

        const filters = {
            ...(status ? { status: status } : {})
        };

        return await Order.findAll({
            where: filters,
        });
    }

    static async createOrder(orderData: IOrder) {
        return await Order.create(orderData);
    }

    static async updateOrder(id: number, updateData: IOrder) {
        const order = await Order.findByPk(id);

        if (!order) throw createHttpError(404, 'Order not found');

        return await order.update(updateData);
    }

    static async deleteOrder(id: number) {
        const order = await Order.findByPk(id);

        if (!order) throw createHttpError(404, 'Order not found');

        await order.destroy();

        return { message: `Order with ID ${id} successfully deleted` };
    }
}
