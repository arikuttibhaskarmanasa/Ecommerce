import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { FilterOptions } from '../../types';
import { categories } from '../../data/products';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isMobileFilterVisible: boolean;
  onCloseMobileFilter: () => void;
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  isMobileFilterVisible,
  onCloseMobileFilter,
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || 0,
    max: filters.maxPrice || 1000,
  });

  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    filters.rating
  );

  // Apply price range when user stops adjusting
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        ...filters,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange, filters, onFilterChange]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleCategoryClick = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
      subcategory: undefined,
    });
  };

  const handleSubcategoryClick = (subcategory: string) => {
    onFilterChange({
      ...filters,
      subcategory: filters.subcategory === subcategory ? undefined : subcategory,
    });
  };

  const handleRatingClick = (rating: number) => {
    const newRating = selectedRating === rating ? undefined : rating;
    setSelectedRating(newRating);
    onFilterChange({ ...filters, rating: newRating });
  };

  const sidebarClasses = `
    ${isMobileFilterVisible ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 transition-transform duration-300 ease-in-out
    fixed md:relative top-0 left-0 h-full md:h-auto z-40 md:z-0
    bg-white md:bg-transparent w-80 md:w-64 p-4 shadow-lg md:shadow-none
    overflow-y-auto
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileFilterVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onCloseMobileFilter}
        />
      )}

      <div className={sidebarClasses}>
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={onCloseMobileFilter}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filters</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear all
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <button
            className="flex justify-between items-center w-full py-2 font-medium"
            onClick={() => toggleSection('categories')}
          >
            <span>Categories</span>
            {expandedSections.categories ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.categories && (
            <div className="mt-2 space-y-2">
              {Object.keys(categories).map((category) => (
                <div key={category} className="space-y-1">
                  <div className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.category === category}
                      onChange={() => handleCategoryClick(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {category}
                    </label>
                  </div>

                  {filters.category === category && (
                    <div className="ml-6 space-y-1 mt-1">
                      {categories[category].map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <input
                            id={`subcategory-${subcategory}`}
                            type="checkbox"
                            className="h-3 w-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={filters.subcategory === subcategory}
                            onChange={() => handleSubcategoryClick(subcategory)}
                          />
                          <label
                            htmlFor={`subcategory-${subcategory}`}
                            className="ml-2 text-xs text-gray-600"
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button
            className="flex justify-between items-center w-full py-2 font-medium"
            onClick={() => toggleSection('price')}
          >
            <span>Price Range</span>
            {expandedSections.price ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.price && (
            <div className="mt-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">
                  ${priceRange.min}
                </span>
                <span className="text-sm text-gray-600">
                  ${priceRange.max}
                </span>
              </div>

              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="mt-2 flex items-center space-x-2">
                <div>
                  <label
                    htmlFor="min-price"
                    className="block text-xs text-gray-700 mb-1"
                  >
                    Min $
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }
                    className="w-full py-1 px-2 text-sm border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max-price"
                    className="block text-xs text-gray-700 mb-1"
                  >
                    Max $
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="w-full py-1 px-2 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ratings */}
        <div className="mb-6">
          <button
            className="flex justify-between items-center w-full py-2 font-medium"
            onClick={() => toggleSection('rating')}
          >
            <span>Rating</span>
            {expandedSections.rating ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.rating && (
            <div className="mt-2 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    id={`rating-${rating}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingClick(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 text-sm text-gray-700 flex items-center"
                  >
                    {rating}+ 
                    <span className="ml-1 text-yellow-400">★</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;