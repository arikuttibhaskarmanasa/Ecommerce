import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    updateQuantity(product.id, newQuantity);
    
    // Simulate network delay for a smoother UI experience
    setTimeout(() => {
      setIsUpdating(false);
    }, 300);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 animate-fadeIn">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="sm:ml-6 flex-1 flex flex-col sm:flex-row">
        <div className="flex-1">
          <Link 
            to={`/products/${product.id}`}
            className="text-lg font-medium text-gray-900 hover:text-primary-600"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            Category: {product.category}
            {product.subcategory && ` / ${product.subcategory}`}
          </p>
          <div className="mt-1 flex items-end justify-between sm:hidden">
            <p className="text-lg font-medium text-gray-900">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-700">
              Subtotal: {formatPrice(product.price * quantity)}
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 flex justify-between items-center sm:items-start sm:flex-col sm:space-y-4">
          {/* Price (desktop) */}
          <div className="hidden sm:block text-right">
            <p className="text-lg font-medium text-gray-900">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center border border-gray-300 rounded">
            <button
              type="button"
              disabled={quantity <= 1 || isUpdating}
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-gray-900 min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remove button and Subtotal (desktop) */}
          <div className="flex items-center sm:flex-col sm:items-end">
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 flex items-center text-sm"
            >
              <Trash2 size={16} className="mr-1" />
              <span>Remove</span>
            </button>
            <p className="hidden sm:block mt-2 text-sm text-gray-700">
              Subtotal: {formatPrice(product.price * quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;