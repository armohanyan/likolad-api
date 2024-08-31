import {IProduct} from "../types/product";
import {Category, Media, Product, ProductCategory, Rating, sequelize} from "../models";
import createHttpError from "http-errors";
import fs from 'fs';
import {fn, col, literal, Sequelize} from 'sequelize';

export default class ProductService {
    static async getProducts() {
        return await Product.findAll(
            {
                include: [
                    {
                        model: Category,
                        through: {
                            attributes: [],
                        },
                        as: "category",
                    },
                    {
                        model: Media,
                        as: 'media'
                    },
                    {
                        model: Rating,
                        as: 'ratings',
                        attributes: []
                    },
                ],
                attributes: [
                    'id',
                    'title_am',
                    'title_en',
                    'description_am',
                    'description_en',
                    'price',
                    [fn('AVG', col('ratings.rating')), 'rating'],
                ],
                group: [
                    'Product.id',
                    'category.id',
                    'media.id'
                ],
                order: [literal('rating DESC')]
        });
    }

    static async createProduct(params: { productJsonData: string, imagePaths: string[],  videoPaths: string[]}) {
        const { productJsonData, imagePaths, videoPaths } = params;
        const productData = JSON.parse(productJsonData) as IProduct & { categoryIds: number[] };
        const { title_am, title_en, description_am, description_en, price, categoryIds } = productData;

        const product = await Product.create({
            title_am,
            title_en,
            description_am,
            description_en,
            price
        });

        await Promise.all(
            categoryIds.map(async (category) => this.addCategory(category, product.id ))
        )

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
        const {  title_am, title_en, description_am, description_en, price, categoryIds } = productData;

        const product = await Product.findByPk(id);

        if (!product) throw createHttpError(404, 'Product not found');

        await product.update({
            title_am,
            title_en,
            description_am,
            description_en,
            price
        });

        await ProductCategory.destroy({
            where: { productId: id }
        })

        await Promise.all(
            categoryIds.map(async (category) => this.addCategory(category, product.id ))
        )

        // todo: refactor this part
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

        if (!product) throw createHttpError(404, 'Product not found');

        const mediaFiles = await Media.findAll({ where: { productId: id } });

        for (const media of mediaFiles) {
            const filePath = process.cwd() + '/' +  media.getDataValue('path');

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Media.destroy({ where: { productId: id } });

        await product.destroy();

        return { message: 'Product deleted successfully' };
    }

      static async addCategory(categoryId: number, productId: number) {
        await ProductCategory.create({
            productId,
            categoryId,
        })
    }
}
