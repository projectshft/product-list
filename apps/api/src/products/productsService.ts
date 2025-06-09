import { Product } from './productModel';
import {
  ProductCreationParams,
  ProductDto,
  ProductListResponse,
  ProductQueryParams,
} from './productTypes';
import {
  convertDocumentToProductDto,
  returnFindOptions,
  returnSortOptions,
} from './productHelpers';
import { MongooseError } from 'mongoose';

export class ProductsService {
  public async getAllProducts({
    page,
    limit,
    category,
    price,
    query,
  }: ProductQueryParams): Promise<ProductListResponse | Error> {
    try {
      const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
      const limitAsInt = parseInt(typeof limit === 'string' ? limit : '9');

      const productDocuments = await Product.find(
        returnFindOptions(category, query)
      )
        .skip(limitAsInt * (pageAsInt - 1))
        .limit(limitAsInt)
        .sort(returnSortOptions(price));

      const count = await Product.countDocuments(
        returnFindOptions(category, query)
      );

      const productsDto = productDocuments.map((product) => {
        return convertDocumentToProductDto(product);
      });

      return {
        products: productsDto,
        totalPages: Math.ceil(count / limitAsInt),
        currentPage: pageAsInt,
      };
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`[getAllProducts] ${error.message}`);
      }
      throw new Error('[getAllProducts] unknown error');
    }
  }

  public async getProductById(productId: string): Promise<ProductDto | Error> {
    try {
      const productDocument = await Product.findById(productId);
      if (!productDocument)
        throw new Error('[getProductById] product not found');
      return convertDocumentToProductDto(productDocument);
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`[getProductById] ${error.message}`);
      }
      if (typeof error === 'string') throw new Error(error);
      throw new Error('[getProductById] unknown error');
    }
  }

  public async createProduct(
    productToCreate: ProductCreationParams
  ): Promise<ProductDto | Error> {
    try {
      const productDocument = await Product.create(productToCreate);
      if (!productDocument)
        throw new Error('[createProduct] create product failed');
      return convertDocumentToProductDto(productDocument);
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`[createProduct] ${error.message}`);
      }
      if (typeof error === 'string') throw new Error(error);
      throw new Error('[createProduct] unknown error');
    }
  }

  public async deleteProduct(productId: string): Promise<ProductDto | Error> {
    try {
      const productDocument = await Product.findByIdAndDelete(productId);
      if (!productDocument)
        throw new Error('[deleteProduct] delete product failed');
      return convertDocumentToProductDto(productDocument);
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`[deleteProduct] ${error.message}`);
      }
      if (typeof error === 'string') throw new Error(error);
      throw new Error('[deleteProduct] unknown error');
    }
  }
}
