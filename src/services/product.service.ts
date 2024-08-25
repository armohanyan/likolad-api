import {IProduct} from "../types/product";
import {Category, Product} from "../models"; // Adjust the import path as needed

export default class ProductService {

    // Retrieve all products with their associated categories
    static async getProducts() {
        console.log(123)
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

    static async createProduct(productData: IProduct & { categoryIds: number[] } ) {
        const { title, description, images, video, price, favorite, categoryIds } = productData;
        console.log(productData)
            const product = await Product.create({
                title,
                description,
                images,
                video,
                price,
                favorite,
            });

            if (categoryIds && categoryIds.length > 0) {
                await product.setCategories(categoryIds);
            }

            return product
    }
}
