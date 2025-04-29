export type FilterState = {
  category?: string;
  sortBy?: 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
};

export type FilterModalState = {
  isVisible: boolean;
  category?: string;
  sortBy?: 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
};
