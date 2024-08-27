import {IProduct} from "../types/product";
import {Category, Media, Product} from "../models";
import createHttpError from "http-errors";
import fs from 'fs';
import path from 'path';

export default class ProductService {
    static async getProducts() {
        return await Product.findAll({
            include: [
                {
                    model: Category,
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Media,
                    as: 'media'
                },
            ],
        });
    }

    static async createProduct(params: { productJsonData: string, imagePaths: string[],  videoPaths: string[]}) {
        console.log(params, 'params')
        const { productJsonData, imagePaths, videoPaths } = params;
        const productData = JSON.parse(productJsonData) as IProduct & { categoryIds: number[] };
        const { title, description, price, favorite, categoryIds } = productData;

        const product = await Product.create({
            title,
            description,
            price,
            favorite,
        });

        if (categoryIds && categoryIds.length > 0) {
            await product.setCategories(categoryIds);
        }
        console.log(imagePaths, 'imagePaths')
        // @ts-ignore
        await Media.bulkCreate([
            ...imagePaths.map(path => ({ type: 'image', path, productId: product.id })),
            ...videoPaths.map(path => ({ type: 'video', path, productId: product.id })),
        ]);

        return product;
    }

    static async updateProduct(id: number, params: { productJsonData: string, imagePaths: string[], videoPaths: string[] }) {
        const { productJsonData, imagePaths, videoPaths } = params;
        const productData = JSON.parse(productJsonData) as IProduct & { categoryIds: number[] };
        const { title, description, price, favorite, categoryIds } = productData;

        const product = await Product.findByPk(id);

        if (!product) {
            throw createHttpError(404, 'Product not found');
        }

        console.log(product)

        await product.update({
            title,
            description,
            price,
            favorite,
        });

        if (categoryIds && categoryIds.length > 0) {
            await product.setCategories(categoryIds);
        } else {
            await product.setCategories([]);
        }

        // Remove old media and add new ones
        await Media.destroy({ where: { productId: id } });
        // @ts-ignore
        await Media.bulkCreate([
            ...imagePaths.map(path => ({ type: 'image', path, productId: id })),
            ...videoPaths.map(path => ({ type: 'video', path, productId: id })),
        ]);

        return product;
    }

    static async deleteProduct(id: number) {
        const product = await Product.findByPk(id);

        if (!product) {
            throw createHttpError(404, 'Product not found');
        }

        await product.destroy();

        const mediaFiles = await Media.findAll({ where: { productId: id } });

        for (const media of mediaFiles) {
            const filePath = path.resolve('uploads', media.type === 'image' ? 'images' : 'videos', media.path);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Media.destroy({ where: { productId: id } });

        await product.destroy();

        return { message: 'Product deleted successfully' };
    }
}
