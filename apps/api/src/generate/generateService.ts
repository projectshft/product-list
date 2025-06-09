import { Review } from '../reviews/reviewModel';
import { Product } from '../products/productModel';
import { buildProduct, buildReview } from './generateHelpers';
import { MongooseError } from 'mongoose';

const PRODUCTS = 90;
const REVIEWS = 5;

export class GenerateService {
  public async generateData(): Promise<void> {
    try {
      for (let i = 0; i < PRODUCTS; i++) {
        //Build product and add to database

        const productDocument = await Product.create(buildProduct());
        console.log(`Created ${productDocument.name}`);

        for (let i = 0; i < REVIEWS; i++) {
          //Build review with productDocument._id
          const reviewDocument = await Review.create({
            ...buildReview(),
            productId: productDocument._id,
          });
          console.log(`Added review ${reviewDocument._id}`);
        }
      }
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`[generateData] ${error.message}`);
      }
      throw new Error('[generateData] unknown error');
    }
  }
}
