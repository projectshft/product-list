import { Document, FilterQuery, SortOrder } from 'mongoose';
import { ProductDto } from './productTypes';
import { ProductType } from './productModel';

export const convertDocumentToProductDto = (document: Document): ProductDto => {
  const dto = document.toObject();
  return { ...dto, _id: dto._id.toString() } as ProductDto;
};

/**
 * Build sort options. Returns object conditional on the value of price param.
 * @param {'highest' | 'lowest' | undefined} price - Optional.
 * @returns {Record<string, SortOrder>} Returns a record used by Mongoose to sort search results.
 */
export const returnSortOptions = (
  price: 'highest' | 'lowest' | undefined
): Record<string, SortOrder> => {
  if (price === 'highest') return { price: -1, createdAt: -1 };
  else if (price === 'lowest') return { price: 1, createdAt: -1 };
  else return { createdAt: -1 };
};

/**
 * Format the find options for a product.
 * Builds category and find objects.
 * Returns object conditional on category or query being defined.
 * @param {string | undefined} category - Optional product category.
 * @param {string | undefined} query - Optional search query.
 * @returns {FilterQuery<ProductType>} Returns a Mongoose query for Product model.
 */
export const returnFindOptions = (
  category: string | undefined,
  query: string | undefined
): FilterQuery<ProductType> => {
  const categoryFindObject = {
    category: { $regex: category, $options: 'i' },
  };
  const queryFindObject = { name: { $regex: query, $options: 'i' } };
  if (category && query) return { ...categoryFindObject, ...queryFindObject };
  if (query) return queryFindObject;
  if (category) return categoryFindObject;
  return {};
};
