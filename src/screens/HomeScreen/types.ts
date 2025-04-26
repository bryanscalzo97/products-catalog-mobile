export type SortBy = 'price' | 'rating';
export type SortOrder = 'asc' | 'desc';

export type FilterState = {
  category: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
};

export type FilterModalState = FilterState & {
  isVisible: boolean;
};
