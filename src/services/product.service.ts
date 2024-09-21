import {IProduct} from "../types/product";
import {Category, Media, Product, ProductCategory, Rating, sequelize} from "../models";
import createHttpError from "http-errors";
import fs from 'fs';
import {fn, col, Op} from 'sequelize';

interface GetProductsOptions {
    searchTerm?: string;
    categoryId?: number;
    sortBy?: 'price' | 'rating';
    sortOrder?: 'ASC' | 'DESC';
}

export default class ProductService {
    static async getProducts(options: GetProductsOptions) {
        const { searchTerm, categoryId, sortBy = 'rating', sortOrder = 'DESC' } = options;
        const whereClause: any = {};

        if (searchTerm) {
            whereClause[Op.or] = [
                { title_am: { [Op.like]: `%${searchTerm}%` } },
                { title_en: { [Op.like]: `%${searchTerm}%` } },
                { description_am: { [Op.like]: `%${searchTerm}%` } },
                { description_en: { [Op.like]: `%${searchTerm}%` } },
                {
                    [Op.or]: {
                        '$category.title_am$': { [Op.like]: `%${searchTerm}%` },
                        '$category.title_en$': { [Op.like]: `%${searchTerm}%` },
                    },
                }
            ];
        }

        if (categoryId) {
            whereClause['$category.id$'] = categoryId;
        }

        return await Product.findAll({
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
            where: whereClause,
            group: [
                'Product.id',
                'category.id',
                'media.id'
            ],
            order: [
                [fn('AVG', col('ratings.rating')), 'DESC'], // Order by rating
                [sortBy, sortOrder] // Order by price or other sorting criteria
            ]
        });
    }

    static async getProduct(id: number) {
        const whereClause: any = {};

        return await Product.findByPk(id, {
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
