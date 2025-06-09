import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Queries,
  Route,
  SuccessResponse,
  Response,
} from 'tsoa';
import { ProductsService } from './productsService';
import {
  ProductCreationParams,
  ProductDto,
  ProductListResponse,
  ProductQueryParams,
} from './productTypes';
import { ValidateErrorJSON } from '../errors/errorTypes';

@Route('products')
export class ProductsController extends Controller {
  /**
   * Retrieves a an array of products. Requires URL query params page and limit.
   * Optional URL query params page and limit.
   * If no page or limit given, only first 10 results returned.
   * @example "http://localhost:3000/products?page=1&limit=5"
   */
  @Get()
  public async getAllProducts(
    @Queries() queryParams: ProductQueryParams
  ): Promise<ProductListResponse | Error> {
    return new ProductsService().getAllProducts(queryParams);
  }

  /**
   * Retrieves a single product using product Id in URL path.
   * @param {string} productId The unique product id.
   */
  @Get('{productId}')
  public async getProductById(
    @Path() productId: string
  ): Promise<ProductDto | Error> {
    return new ProductsService().getProductById(productId);
  }

  /**
   * Creates a product. Pass product information using request body.
   * @example {
   * "name": "Scissors",
   * "category": "tools",
   * "price": 5.50,
   * "image": "https://via.placeholder.com/250?text=Product+Image"
   * }
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created')
  @Post()
  public async postProduct(
    @Body() requestBody: ProductCreationParams
  ): Promise<void> {
    this.setStatus(201);
    new ProductsService().createProduct(requestBody);
    return;
  }

  /**
   * Deletes a single product using product Id in URL path.
   * @param {string} productId The unique product id.
   */
  @SuccessResponse('204', 'No Content')
  @Delete('{productId}')
  public async deleteProduct(@Path() productId: string): Promise<void> {
    this.setStatus(204);
    new ProductsService().deleteProduct(productId);
    return;
    // TODO: TomW return for product not found
  }
}
