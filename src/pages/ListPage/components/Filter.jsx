import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Filter as FilterSvg } from '@/assets/icons';
import {
  formatCategoryFilter,
  formatDayFilter,
  formatLocationFilter
} from '@/utils/filterFormat';

import FilterBottomSheet from './FilterBottomSheet';

const Filter = ({ onFilterChange, filterOptions, type, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    location: [],
    day_of_week: []
  });

  useEffect(() => {
    if (filters) {
      setActiveFilters(filters);
    }
  }, [filters]);

  const handleFilterApply = filters => {
    setActiveFilters(filters);
    onFilterChange(filters);
    setIsOpen(false);
  };

  // 활성화된 필터 수
  const filterCount = Object.values(activeFilters).filter(
    filters => filters.length > 0
  ).length;

  // 필터 활성화 여부
  const isFilterActive = filterCount > 0;

  return (
    <>
      <FilterWrapper>
        {/* 필터 아이콘 */}
        <FilterButton onClick={() => setIsOpen(true)}>
          {isFilterActive && <FilterCount>{filterCount}</FilterCount>}
          <FilterIcon $isActive={isFilterActive} />
        </FilterButton>

        {/* 카테고리 */}
        <FilterItem
          onClick={() => setIsOpen(true)}
          $isActive={activeFilters.category.length > 0}
        >
          {formatCategoryFilter(activeFilters.category, type)}
        </FilterItem>

        {/* 위치 */}
        {type !== 'show' && (
          <FilterItem
            onClick={() => setIsOpen(true)}
            $isActive={activeFilters.location.length > 0}
          >
            {formatLocationFilter(activeFilters.location)}
          </FilterItem>
        )}

        {/* 요일 */}
        <FilterItem
          onClick={() => setIsOpen(true)}
          $isActive={activeFilters.day_of_week.length > 0}
        >
          {formatDayFilter(activeFilters.day_of_week)}
        </FilterItem>
      </FilterWrapper>

      <FilterBottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApply={handleFilterApply}
        initialFilters={activeFilters}
        filterOptions={filterOptions}
        type={type}
      />
    </>
  );
};

export default Filter;

const FilterWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0 1.25rem 1.5rem;
`;

const FilterButton = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterCount = styled.div`
  position: absolute;
  top: -0.15rem;
  right: -0.15rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--green1-100);
  color: white;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterItem = styled.div`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: ${({ $isActive }) =>
    $isActive ? 'var(--green1-100)' : 'var(--gray3)'};
  border: 1px solid
    ${({ $isActive }) => ($isActive ? 'var(--green1-100)' : 'var(--gray3)')};
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--green1-10)' : 'white'};
  border-radius: 1.25rem;
  padding: 0.5rem 0.75rem;
  white-space: nowrap;
  cursor: pointer;
`;

const FilterIcon = styled(FilterSvg)`
  rect {
    stroke: ${({ $isActive }) => ($isActive ? 'var(--green1-100)' : '#787878')};
  }

  path[fill='#787878'] {
    fill: ${({ $isActive }) => ($isActive ? 'var(--green1-100)' : '#787878')};
  }
`;
