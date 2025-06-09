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
import {
  ReviewCreationParams,
  ReviewListResponse,
  ReviewQueryParams,
} from './reviewTypes';
import { ReviewsService } from './reviewsService';
import { ValidateErrorJSON } from '../errors/errorTypes';

@Route('reviews')
export class ReviewsController extends Controller {
  /**
   * Retrieves a an array of reviews for a specific product Id.
   * Optional URL query params page and limit.
   * If no page or limit given, only first 10 results returned.
   * @example "http://localhost:3000/reviews/6839f26a130912d633d748c5?page=1&limit=5"
   */
  @Get('{productId}')
  public async getProductReviews(
    @Path() productId: string,
    @Queries() queryParams: ReviewQueryParams
  ): Promise<ReviewListResponse | Error> {
    return new ReviewsService().getProductReviews(productId, queryParams);
  }

  /**
   * Creates a review. Pass review information using request body.
   * @example {
   * "text": "Colligo angustus delectatio ademptio cupio celer volubilis.",
   * "rating": "5",
   * "productId": "",
   * }
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created')
  @Post()
  public async postProduct(
    @Body() requestBody: ReviewCreationParams
  ): Promise<void> {
    this.setStatus(201);
    new ReviewsService().createReview(requestBody);
    return;
  }

  /**
   * Deletes a single review using review Id in URL path.
   * @param {string} reviewId The unique review id.
   */
  @SuccessResponse('204', 'No Content')
  @Delete('{reviewId}')
  public async deleteProduct(@Path() reviewId: string): Promise<void> {
    this.setStatus(204);
    new ReviewsService().deleteReview(reviewId);
    return;
  }
}
