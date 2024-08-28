import {Testimonial} from "../models";
import createHttpError from "http-errors";
import {ITestimonial} from "../types/testimonial";

export default class TestimonialService {
    static async getTestimonials() {
        return await Testimonial.findAll();
    }

    static async createTestimonial({ content, author }: ITestimonial) {
        return await Testimonial.create({content, author});
    }

    static async updateTestimonial(id: number, { content, author }: ITestimonial) {
        const testimonial = await Testimonial.findByPk(id);

        if (!testimonial) {
            throw createHttpError(404, 'Testimonial not found');
        }

        testimonial.content = content;
        testimonial.author = author;

        await testimonial.save();

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
