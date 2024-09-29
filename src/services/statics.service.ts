import { Category, Order, Product, Testimonial } from "../models"

export default class StaticsService {
    static async getStatics() {
        const products = await Product.count()
        const categories = await Category.count()
        const order = await Order.count()
        const testimonials = await Testimonial.count()

        return {
            products,
            categories,
            order,
            testimonials
        }
    }
}
