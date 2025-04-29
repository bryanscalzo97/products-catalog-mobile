import { useState } from 'react';
import { FilterModalState, FilterState } from '../../../models';

const INITIAL_FILTERS: FilterState = {
  category: '',
  sortBy: 'price',
  sortOrder: 'asc',
};

export const useFilters = () => {
  // Main filter state that affects the product list
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Modal state including temporary filters
  const [modalState, setModalState] = useState<FilterModalState>({
    ...INITIAL_FILTERS,
    isVisible: false,
  });

  // Opens the filter modal and initializes temporary states with current values
  const openFilterModal = () => {
    setModalState({
      ...filters,
      isVisible: true,
    });
  };

  // Applies the temporary filter states to the main states and closes the modal
  const applyFilters = () => {
    const { isVisible, ...newFilters } = modalState;
    setFilters(newFilters);
    setModalState({ ...newFilters, isVisible: false });
  };

  // Updates a specific filter in the modal state
  const updateModalFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setModalState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    filters,
    setFilters,
    modalState,
    setModalState,
    openFilterModal,
    applyFilters,
    updateModalFilter,
  };
};
