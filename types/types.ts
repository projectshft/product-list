export type SearchFields = {
  category?: RegExp;
  search?: RegExp;
  price?: number;
};

export type AggregationMatch = {
  $match: {
    name?: RegExp;
    category?: RegExp;
  };
};

export type AggregationSort = {
  $sort: {
    price?: number;
  };
};
