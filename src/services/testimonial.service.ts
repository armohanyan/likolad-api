import {Testimonial} from "../models";
import createHttpError from "http-errors";
import {ITestimonial} from "../types/testimonial";

export default class TestimonialService {
    static async getTestimonials() {
        return await Testimonial.findAll();
    }

    static async createTestimonial(testimonial: ITestimonial) {
        return await Testimonial.create(testimonial);
    }

    static async updateTestimonial(id: number, data: ITestimonial) {
        const testimonial = await Testimonial.findByPk(id);

        if (!testimonial) {
            throw createHttpError(404, 'Testimonial not found');
        }

        await testimonial.update(data);

        return testimonial
    }

    static async deleteTestimonial(id: number) {
        const testimonial = await Testimonial.findByPk(id);

        if (!testimonial) {
            throw createHttpError(404, 'Testimonial not found');
        }

        await testimonial.destroy();

        return { message: 'Testimonial deleted successfully' };
    }
}
