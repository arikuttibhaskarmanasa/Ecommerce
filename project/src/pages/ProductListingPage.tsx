import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/products';
import { Product, FilterOptions } from '../types';
import ProductGrid from '../components/products/ProductGrid';
import FilterSidebar from '../components/products/FilterSidebar';

const ProductListingPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOption, setSortOption] = useState('');
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const location = useLocation();
  
  // Parse URL search params on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialFilters: FilterOptions = {};
    
    if (searchParams.has('category')) {
      initialFilters.category = searchParams.get('category') || undefined;
    }
    
    if (searchParams.has('subcategory')) {
      initialFilters.subcategory = searchParams.get('subcategory') || undefined;
    }
    
    if (searchParams.has('minPrice')) {
      initialFilters.minPrice = Number(searchParams.get('minPrice'));
    }
    
    if (searchParams.has('maxPrice')) {
      initialFilters.maxPrice = Number(searchParams.get('maxPrice'));
    }
    
    if (searchParams.has('rating')) {
      initialFilters.rating = Number(searchParams.get('rating'));
    }
    
    if (searchParams.has('sort')) {
      const sort = searchParams.get('sort');
      if (sort) {
        setSortOption(sort);
        initialFilters.sortBy = sort as any;
      }
    }
    
    if (Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters);
    }
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [location.search]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply subcategory filter
    if (filters.subcategory) {
      result = result.filter(product => product.subcategory === filters.subcategory);
    }
    
    // Apply price range filter
    if (filters.minPrice !== undefined) {
      result = result.filter(product => product.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      result = result.filter(product => product.price <= filters.maxPrice!);
    }
    
    // Apply rating filter
    if (filters.rating) {
      result = result.filter(product => product.rating >= filters.rating!);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleClearFilters = () => {
    setFilters({});
    setSortOption('');
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    setFilters(prevFilters => ({
      ...prevFilters,
      sortBy: value as any || undefined,
    }));
  };
  
  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>
      
      {/* Mobile filter button */}
      <div className="mb-6 flex justify-between items-center md:hidden">
        <button
          type="button"
          onClick={toggleMobileFilter}
          className="btn btn-outline flex items-center"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </button>
        
        <div className="flex items-center">
          <label htmlFor="mobile-sort" className="sr-only">Sort by</label>
          <select
            id="mobile-sort"
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobileFilterVisible={isMobileFilterVisible}
            onCloseMobileFilter={() => setIsMobileFilterVisible(false)}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1 md:ml-8">
          {/* Desktop sorting */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
            
            <div className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2 text-gray-500" />
              <label htmlFor="desktop-sort" className="mr-2 text-sm text-gray-700">Sort by:</label>
              <select
                id="desktop-sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Active filters */}
          {Object.keys(filters).length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-700">Active filters:</span>
              
              {filters.category && (
                <div className="inline-flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  Category: {filters.category}
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, category: undefined, subcategory: undefined }))}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {filters.subcategory && (
                <div className="inline-flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  Subcategory: {filters.subcategory}
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, subcategory: undefined }))}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                <div className="inline-flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  Price: 
                  {filters.minPrice !== undefined ? ` $${filters.minPrice}` : ' $0'}
                  {' - '}
                  {filters.maxPrice !== undefined ? `$${filters.maxPrice}` : '$1000+'}
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {filters.rating && (
                <div className="inline-flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
                  Rating: {filters.rating}+ stars
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, rating: undefined }))}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm text-primary-600 hover:text-primary-800 ml-2"
              >
                Clear all
              </button>
            </div>
          )}
          
          {/* Products Grid */}
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;