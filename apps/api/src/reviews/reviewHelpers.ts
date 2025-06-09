import { Document } from 'mongoose';
import { ReviewDto } from './reviewTypes';

export const convertDocumentToReviewDto = (document: Document): ReviewDto => {
  const dto = document.toObject();
  return {
    ...dto,
    _id: dto._id.toString(),
    productId: dto.productId.toString(),
  } as ReviewDto;
};
