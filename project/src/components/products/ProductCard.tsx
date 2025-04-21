import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, truncateText } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div 
      className="group card h-full transition-all duration-300 animate-fadeIn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          
          {/* Quick action buttons */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow-md hover:bg-primary-500 hover:text-white transition-colors duration-200"
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
                isFavorite 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white hover:bg-red-500 hover:text-white'
              }`}
              aria-label="Add to favorites"
            >
              <Heart size={20} />
            </button>
          </div>
          
          {/* Badge for category */}
          <div className="absolute top-2 left-2">
            <span className="badge badge-primary">
              {product.category}
            </span>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200 mb-1">
            {truncateText(product.name, 40)}
          </h3>
          
          {/* Ratings */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.numReviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            
            {!product.inStock && (
              <span className="text-sm text-red-600 font-medium">
                Out of stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;