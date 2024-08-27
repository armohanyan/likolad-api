import {Category} from "../models";
import createHttpError from "http-errors";

export default class CategoryService {
    static async getCategories() {
        return await Category.findAll({
            include: [{ model: Category, as: 'parent' }]
        });
    }

    static async createCategory(data: { title: string; description?: string; parentId?: number }) {
        return await Category.create(data);
    }

    static async updateCategory(id: number, data: { title: string; description?: string; parentId?: number }) {
        const category = await Category.findByPk(id);

        if (!category) {
            throw createHttpError(404, 'Category not found');
        }

        await category.update(data);

        return category;
    }

    static async deleteCategory(id: number) {
        const category = await Category.findByPk(id, {
            include: [{ model: Category, as: 'subcategories' }] // Include subcategories
        });

        if (!category) {
            throw createHttpError(404, 'Category not found');
        }

        // Delete subcategories first
        await Category.destroy({
            where: {
                parentId: id
            }
        });

        await category.destroy();

        return { message: 'Category and its subcategories deleted successfully' };
    }
}
