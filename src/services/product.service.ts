import {IProduct} from "../types/product";
import {Category, Product} from "../models"; // Adjust the import path as needed

export default class ProductService {

    // Retrieve all products with their associated categories
    static async getProducts() {
        return await Product.findAll({
            include: [
                {
                    model: Category,
                    through: {
                        attributes: [] // Exclude ProductCategory join table attributes
                    },
                },
            ],
        });
    }

    static async createProduct(params: { productJsonData: string, imagePaths: string[],  videoPaths: string[]}) {
        const {productJsonData, imagePaths, videoPaths} = params;
        const productData = JSON.parse(productJsonData) as IProduct & { categoryIds: number[] };
        let { title, description, price, favorite, categoryIds } = productData;

        const product = await Product.create({
            title,
            description,
            images: JSON.stringify(imagePaths),
            videos: JSON.stringify(videoPaths),
            price,
            favorite,
        });

        if (categoryIds && categoryIds.length > 0) {
            await product.setCategories(categoryIds);
        }

        return product
    }
}
